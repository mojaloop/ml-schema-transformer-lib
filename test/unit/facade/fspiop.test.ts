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

import { FspiopTransformFacade } from '../../../src/facades';
import { fspiop, fspiop_iso20022, mockLogger } from '../../fixtures';

describe('FSPIOPTransformFacade tests', () => {
  const testCase = (source: unknown, transformerFn: Function, expectedTarget: unknown) => {
    return async () => {
      const target = await transformerFn(source);
      if (expectedTarget !== null) expect(target).toEqual(expectedTarget);
    };
  }
  describe('Parties', () => {
    test('should transform PUT parties payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.parties.put, FspiopTransformFacade.parties.put, null)();
    });
    test('should transform PUT parties error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.parties.putError, FspiopTransformFacade.parties.putError, null)();
    });
  })
  describe('Quotes', () => {
    test('should transform POST quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.quotes.post, FspiopTransformFacade.quotes.post, fspiop_iso20022.quotes.post)();
    });
    test('should transform PUT quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.quotes.put, FspiopTransformFacade.quotes.put, null)();
    });
    test('should transform PUT quotes error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.quotes.putError, FspiopTransformFacade.quotes.putError, null)();
    });
  })
  describe('FXQuotes', () => {
    test('should transform POST FX quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxQuotes.post, FspiopTransformFacade.fxQuotes.post, null)();
    })
    test('should transform PUT FX quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxQuotes.put, FspiopTransformFacade.fxQuotes.put, null)();
    })
    test('should transform PUT FX quotes error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxQuotes.putError, FspiopTransformFacade.fxQuotes.putError, null)();
    })
  })
  describe('Transfers', () => {
    test('should transform POST transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.post, FspiopTransformFacade.transfers.post, null)();
    })
    test('should transform PATCH transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.patch, FspiopTransformFacade.transfers.patch, null)();
    })
    test('should transform PUT transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.put, FspiopTransformFacade.transfers.put, null)();
    })
    test('should transform PUT transfers error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.putError, FspiopTransformFacade.transfers.putError, null)();
    })
  })
  describe('FXTransfers', () => {
    test('should transform POST FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.post, FspiopTransformFacade.fxTransfers.post, null)();
    })
    test('should transform PATCH FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.patch, FspiopTransformFacade.fxTransfers.patch, null)();
    })
    test('should transform PUT FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.put, FspiopTransformFacade.fxTransfers.put, null)();
    })
    test('should transform PUT FX transfers error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.putError, FspiopTransformFacade.fxTransfers.putError, null)();
    })
  })
});
