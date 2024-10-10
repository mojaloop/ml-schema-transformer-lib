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

import { IsoSource, IsoTransformFacadeFunction, Target } from '../../../src/types';
import { TransformFacades } from '../../../src';
import * as createTransformerLib from '../../../src/lib/createTransformer';
import { fspiopIso20022Sources, mockLogger, expectedFspiopTargets } from '../../fixtures';
import { FSPIO20022PMappings } from '../../../src/mappings';
import { getProp, setProp } from 'src/lib/utils';

const { FSPIOPISO20022: FspiopIso20022TransformFacade } = TransformFacades;

const fspiopTargets = expectedFspiopTargets;

describe('FSPIOPISO20022TransformFacade tests', () => {
  const testCase = (source: IsoSource, transformerFn: IsoTransformFacadeFunction, expectedTarget: Partial<Target> | null = null) => {
    return async () => {
      const target = await transformerFn(source, {});
      expect(target).toHaveProperty('body');
      if (expectedTarget !== null) expect(target).toEqual(expectedTarget);
    };
  }

  describe('configure', () => {
    test('should configure logger', async () => {
      const logger = mockLogger;
      FspiopIso20022TransformFacade.configure({ logger });
      vi.spyOn(createTransformerLib, 'createTransformer').mockImplementationOnce(async () => {
        throw new Error('Test error')
      });
      const promise = FspiopIso20022TransformFacade.parties.put(fspiopIso20022Sources.parties.put);
      await expect(promise).rejects.toThrow();
      expect(logger.error).toBeCalled();
    });
  });

  describe('Parties', () => {
    test('should transform PUT parties payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.parties.put, FspiopIso20022TransformFacade.parties.put, fspiopTargets.parties.put)();
    });
    test('should transform PUT parties error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.parties.putError, FspiopIso20022TransformFacade.parties.putError, fspiopTargets.parties.putError)();
    });
  });

  describe('Quotes', () => {
    describe('POST /quotes', () => {
      test('should transform POST quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
        await testCase(fspiopIso20022Sources.quotes.post, FspiopIso20022TransformFacade.quotes.post, fspiopTargets.quotes.post)();
      });
      test('should not apply mutation on target if override mapping is set', async () => {
        const source = { ...fspiopIso20022Sources.quotes.post };
        const overrideMapping = FSPIO20022PMappings.quotes.post;
        const target = await FspiopIso20022TransformFacade.quotes.post(source, { overrideMapping });
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.amountType')).toBeUndefined();
      });
      test('should transform POST quotes payload from FSPIOP ISO 20022 to FSPIOP with body.CdtTrfTxInf.ChrgBr != DEBT', async () => {
        const source = { ...fspiopIso20022Sources.quotes.post };
        setProp(source, 'body.CdtTrfTxInf.ChrgBr', 'CRED');
        const target = await FspiopIso20022TransformFacade.quotes.post(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.amountType')).toBe('SEND');
      });
      test('should transform POST quotes payload from FSPIOP ISO 20022 to FSPIOP with refundInfo', async () => {
        const source = { ...fspiopIso20022Sources.quotes.post };
        setProp(source, 'body.CdtTrfTxInf.InstrForCdtrAgt.Cd', 'REFD');
        setProp(source, 'body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf', 'Refund reason');

        const target = await FspiopIso20022TransformFacade.quotes.post(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.transactionType.refundInfo.reason')).toBe('Refund reason');
      });
    });
    test('should transform PUT quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.quotes.put, FspiopIso20022TransformFacade.quotes.put, fspiopTargets.quotes.put)();
    });
    test('should transform PUT quotes error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.quotes.putError, FspiopIso20022TransformFacade.quotes.putError, fspiopTargets.quotes.putError)();
    });
  });

  describe('Transfers', () => {
    test('should transform POST transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.transfers.post, FspiopIso20022TransformFacade.transfers.post, fspiopTargets.transfers.post)();
    });
    test('should transform PATCH transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.transfers.patch, FspiopIso20022TransformFacade.transfers.patch, fspiopTargets.transfers.patch)();
    });
    test('should transform PUT transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.transfers.put, FspiopIso20022TransformFacade.transfers.put, fspiopTargets.transfers.put)();
    });
    test('should transform PUT transfers error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.transfers.putError, FspiopIso20022TransformFacade.transfers.putError, fspiopTargets.transfers.putError)();
    });
  });

  describe('FXQuotes', () => {
    describe('POST /fxQuotes', () => {
      test('should transform POST FX quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
        await testCase(fspiopIso20022Sources.fxQuotes.post, FspiopIso20022TransformFacade.fxQuotes.post, fspiopTargets.fxQuotes.post)();
      });
      test('should not apply mutation on target if override mapping is set', async () => {
        const source = { ...fspiopIso20022Sources.fxQuotes.post };
        const overrideMapping = FSPIO20022PMappings.fxQuotes.post;
        const target = await FspiopIso20022TransformFacade.fxQuotes.post(source, { overrideMapping });
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.amountType')).toBeUndefined();
      });
      test('should transform POST FX quotes payload from FSPIOP ISO 20022 to FSPIOP with body.CdtTrfTxInf.ChrgBr != DEBT', async () => {
        const source = { ...fspiopIso20022Sources.fxQuotes.post };
        setProp(source, 'body.CdtTrfTxInf.ChrgBr', 'CRED');
        const target = await FspiopIso20022TransformFacade.fxQuotes.post(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.amountType')).toBe('SEND');
      });
    });

    describe('PUT /fxQuotes', () => {
      test('should transform PUT FX quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
        await testCase(fspiopIso20022Sources.fxQuotes.put, FspiopIso20022TransformFacade.fxQuotes.put, fspiopTargets.fxQuotes.put)();
      });
      test('should not apply mutation on target if override mapping is set', async () => {
        const source = { ...fspiopIso20022Sources.fxQuotes.put };
        const overrideMapping = FSPIO20022PMappings.fxQuotes.put;
        const target = await FspiopIso20022TransformFacade.fxQuotes.put(source, { overrideMapping });
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.amountType')).toBeUndefined();
      });
      test('should transform POST FX quotes payload from FSPIOP ISO 20022 to FSPIOP with body.CdtTrfTxInf.ChrgBr != DEBT', async () => {
        const source = { ...fspiopIso20022Sources.fxQuotes.put };
        setProp(source, 'body.CdtTrfTxInf.ChrgBr', 'CRED');
        const target = await FspiopIso20022TransformFacade.fxQuotes.put(source);
        expect(target).toHaveProperty('body');
        expect(getProp(target, 'body.amountType')).toBe('SEND');
      });
    });

    test('should transform PUT FX quotes error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.fxQuotes.putError, FspiopIso20022TransformFacade.fxQuotes.putError, fspiopTargets.fxQuotes.putError)();
    });
  });

  describe('FXTransfers', () => {
    test('should transform POST FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.fxTransfers.post, FspiopIso20022TransformFacade.fxTransfers.post, fspiopTargets.fxTransfers.post)();
    });
    test('should transform PATCH FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.fxTransfers.patch, FspiopIso20022TransformFacade.fxTransfers.patch, fspiopTargets.fxTransfers.patch)();
    });
    test('should transform PUT FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.fxTransfers.put, FspiopIso20022TransformFacade.fxTransfers.put, fspiopTargets.fxTransfers.put)();
    });
    test('should transform PUT FX transfers error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
      await testCase(fspiopIso20022Sources.fxTransfers.putError, FspiopIso20022TransformFacade.fxTransfers.putError, fspiopTargets.fxTransfers.putError)();
    });
  });
});
