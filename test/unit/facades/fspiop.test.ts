/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>
 
 * Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

import { TransformFacades } from '../../../src';
import * as createTransformerLib from '../../../src/lib/createTransformer';
import { getProp, setProp } from '../../../src/lib/utils';
import { GenericObject, Source } from '../../../src/types';
import { expectedFspiopIso20022Targets, fspiopSources, mockLogger } from '../../fixtures';
import { FSPIO20022PMappings } from '../../../src/mappings'

const { FSPIOP: FspiopTransformFacade } = TransformFacades;

const expected = (prop: string) => {
  return (target: GenericObject) => {
    return getProp(expectedFspiopIso20022Targets(target), prop);
  }
}

describe('FSPIOPTransformFacade tests', () => {
  FspiopTransformFacade.configure({ logger: mockLogger });

  const testCase = (source: Source, transformerFn: Function, expectedTarget: Function | null = null) => {
    return async () => {
      const target = await transformerFn(source);
      expect(target).toHaveProperty('body');
      if (expectedTarget !== null) {
        const expTargetObj = expectedTarget(target);
        expect(target).toEqual(expTargetObj);
      }
    };
  }

  describe('configure', () => {
    test('should configure logger', async () => {
      const logger = mockLogger;
      FspiopTransformFacade.configure({ logger });
      vi.spyOn(createTransformerLib, 'createTransformer').mockImplementationOnce(() => {
        throw new Error('Test error')
      });
      const promise = FspiopTransformFacade.parties.put(fspiopSources.parties.put);
      await expect(promise).rejects.toThrow();
      expect(logger.error).toBeCalled();
    });
  });
  describe('Parties', () => {
    test('should transform PUT parties payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.parties.put, FspiopTransformFacade.parties.put, expected('parties.put'))();
    });
    test('should transform PUT parties error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.parties.putError, FspiopTransformFacade.parties.putError, expected('parties.putError'))();
    });
  });
  describe('Quotes', () => {
    describe('POST /quotes', () => {
      test('should transform POST quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
        await testCase(fspiopSources.quotes.post, FspiopTransformFacade.quotes.post, expected('quotes.post'))();
      });
      test('should not apply mutation on target if override mapping is set', async () => {
        const source = { ...fspiopSources.quotes.post };
        const overrideMapping = FSPIO20022PMappings.quotes_reverse.post;
        const target = await FspiopTransformFacade.quotes.post(source, { overrideMapping });
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBeUndefined();
      });
      test('should transform POST quotes payload from FSPIOP to FSPIOP ISO 20022 with amountType != SEND', async () => {
        const source = { ...fspiopSources.quotes.post };
        source.body.amountType = 'RECEIVE';
        const target = await FspiopTransformFacade.quotes.post(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBe('DEBT');
      });
      test('should transform POST quotes payload from FSPIOP to FSPIOP ISO 20022 with refundInfo', async () => {
        const source = { ...fspiopSources.quotes.post };
        setProp(source, 'body.transactionType', { refundInfo: { reason: 'Refund reason' } });
        const target = await FspiopTransformFacade.quotes.post(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.InstrForCdtrAgt.Cd')).toBe('REFD');
        expect(getProp(target, 'body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf')).toBe('Refund reason');
      });
    });
    describe('PUT /quotes', () => {
      test('should transform PUT quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
        await testCase(fspiopSources.quotes.put, FspiopTransformFacade.quotes.put, expected('quotes.put'))();
      });
      test('should return SHAR as body.CdtTrfTxInf.ChrgBr if context.isoPostQuote.CdtTrfTxInf.ChrgBr is not set', async () => {
        const source = { ...fspiopSources.quotes.put };
        source.$context = {} as any;
        const target = await FspiopTransformFacade.quotes.put(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBe('SHAR');
      });
      test('should use values in $context if set', async () => {
        const source = { ...fspiopSources.quotes.put };
        source.$context = {
          isoPostQuote: {
            CdtTrfTxInf: {
              Dbtr: 'Dbtr',
              DbtrAgt: 'DbtrAgt',
              Cdtr: 'Cdtr',
              CdtrAgt: 'CdtrAgt',
              ChrgBr: 'ChrgBr'
            }
          }
        } as any;
        const target = await FspiopTransformFacade.quotes.put(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id')).toBe('Dbtr');
        expect(getProp(target, 'body.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id')).toBe('DbtrAgt');
        expect(getProp(target, 'body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id')).toBe('Cdtr');
        expect(getProp(target, 'body.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id')).toBe('CdtrAgt');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBe('ChrgBr');
      });
    });
    test('should transform PUT quotes error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.quotes.putError, FspiopTransformFacade.quotes.putError, expected('quotes.putError'))();
    });
  });
  describe('Transfers', () => {
    test('should transform POST transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.transfers.post, FspiopTransformFacade.transfers.post, expected('transfers.post'))();
    })
    test('should transform PATCH transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.transfers.patch, FspiopTransformFacade.transfers.patch, expected('transfers.patch'))();
    })
    test('should transform PUT transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.transfers.put, FspiopTransformFacade.transfers.put, expected('transfers.put'))();
    })
    test('should transform PUT transfers error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.transfers.putError, FspiopTransformFacade.transfers.putError, expected('transfers.putError'))();
    })
  });
  describe('FXQuotes', () => {
    describe('POST /fxQuotes', () => {
      test('should transform POST FX quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
        await testCase(fspiopSources.fxQuotes.post, FspiopTransformFacade.fxQuotes.post, expected('fxQuotes.post'))();
      });
      test('should not apply mutation on target if override mapping is set', async () => {
        const source = { ...fspiopSources.fxQuotes.post };
        const overrideMapping = FSPIO20022PMappings.fxQuotes_reverse.post;
        const target = await FspiopTransformFacade.fxQuotes.post(source, { overrideMapping });
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBeUndefined();
      });
      test('should transform POST FX quotes payload from FSPIOP to FSPIOP ISO 20022 with amountType === SEND', async () => {
        const source = { ...fspiopSources.fxQuotes.post };
        setProp(source, 'body.conversionTerms.amountType', 'SEND');
        const target = await FspiopTransformFacade.fxQuotes.post(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBe('CRED');
      });
    });
    describe('PUT /fxQuotes', () => {
      test('should transform PUT FX quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
        await testCase(fspiopSources.fxQuotes.put, FspiopTransformFacade.fxQuotes.put, expected('fxQuotes.put'))();
      });
      test('should not apply mutation on target if override mapping is set', async () => {
        const source = { ...fspiopSources.fxQuotes.put };
        const overrideMapping = FSPIO20022PMappings.fxQuotes_reverse.put;
        const target = await FspiopTransformFacade.fxQuotes.put(source, { overrideMapping });
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBeUndefined();
      });
      test('should transform PUT FX quotes payload from FSPIOP to FSPIOP ISO 20022 with amountType === SEND', async () => {
        const source = { ...fspiopSources.fxQuotes.put };
        setProp(source, 'body.conversionTerms.amountType', 'SEND');
        const target = await FspiopTransformFacade.fxQuotes.put(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.CdtTrfTxInf.ChrgBr')).toBe('CRED');
      });
    });
    test('should transform PUT FX quotes error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.fxQuotes.putError, FspiopTransformFacade.fxQuotes.putError, expected('fxQuotes.putError'))();
    });
  });
  describe('FXTransfers', () => {
    test('should transform POST FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.fxTransfers.post, FspiopTransformFacade.fxTransfers.post, expected('fxTransfers.post'))();
    });
    test('should transform PATCH FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.fxTransfers.patch, FspiopTransformFacade.fxTransfers.patch, expected('fxTransfers.patch'))();
    });
    test('should transform PUT FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.fxTransfers.put, FspiopTransformFacade.fxTransfers.put, expected('fxTransfers.put'))();
    });
    test('should transform PUT FX transfers error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiopSources.fxTransfers.putError, FspiopTransformFacade.fxTransfers.putError, expected('fxTransfers.putError'))();
    });
  });
});
