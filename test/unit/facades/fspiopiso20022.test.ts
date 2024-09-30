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

 import { FspiopIso20022TransformFacade } from '../../../src/facades';
 import { fspiop, fspiopIso20022, mockLogger } from '../../fixtures';
 
 describe('FSPIOPISO20022TransformFacade tests', () => {
   const testCase = (source: unknown, transformerFn: Function, expectedTarget: unknown = null) => {
     return async () => {
       const target = await transformerFn(source);
       if (expectedTarget !== null) expect(target).toEqual(expectedTarget);
     };
   }
   describe('Parties', () => {
     test('should transform PUT parties payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.parties.put, FspiopIso20022TransformFacade.parties.put)();
     });
     test('should transform PUT parties error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.parties.putError, FspiopIso20022TransformFacade.parties.putError)();
     });
   })
   describe('Quotes', () => {
     test('should transform POST quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.quotes.post, FspiopIso20022TransformFacade.quotes.post)();
     });
     test('should transform PUT quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.quotes.put, FspiopIso20022TransformFacade.quotes.put)();
     });
     test('should transform PUT quotes error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.quotes.putError, FspiopIso20022TransformFacade.quotes.putError)();
     });
   })
   describe('FXQuotes', () => {
     test('should transform POST FX quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxQuotes.post, FspiopIso20022TransformFacade.fxQuotes.post)();
     })
     test('should transform PUT FX quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxQuotes.put, FspiopIso20022TransformFacade.fxQuotes.put)();
     })
     test('should transform PUT FX quotes error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxQuotes.putError, FspiopIso20022TransformFacade.fxQuotes.putError)();
     })
   })
   describe('Transfers', () => {
     test('should transform POST transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.post, FspiopIso20022TransformFacade.transfers.post)();
     })
     test('should transform PATCH transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.patch, FspiopIso20022TransformFacade.transfers.patch)();
     })
     test('should transform PUT transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.put, FspiopIso20022TransformFacade.transfers.put)();
     })
     test('should transform PUT transfers error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.putError, FspiopIso20022TransformFacade.transfers.putError)();
     })
   })
   describe('FXTransfers', () => {
     test('should transform POST FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.post, FspiopIso20022TransformFacade.fxTransfers.post)();
     })
     test('should transform PATCH FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.patch, FspiopIso20022TransformFacade.fxTransfers.patch)();
     })
     test('should transform PUT FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.put, FspiopIso20022TransformFacade.fxTransfers.put)();
     })
     test('should transform PUT FX transfers error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.putError, FspiopIso20022TransformFacade.fxTransfers.putError)();
     })
   })
 });
 