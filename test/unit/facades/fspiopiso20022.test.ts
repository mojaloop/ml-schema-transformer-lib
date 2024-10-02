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

import { TransformFacadeFunction } from 'src/types';
import { TransformFacades } from '../../../src';
import * as createTransformerLib from '../../../src/lib/createTransformer';
import { fspiopIso20022, mockLogger } from '../../fixtures';

const { FSPIOPISO20022: FspiopIso20022TransformFacade } = TransformFacades;

const expectedFspiop = {
  parties: {
    put: {
      body: {
        party: {
          partyIdInfo: {
            partyIdType: "MSISDN",
            partyIdentifier: "16135551212",
            fspId: "string"
          },
          name: "string",
          supportedCurrencies: [
            "AED"
          ]
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: "5100"
        }
      }
    }
  },
  quotes: {
    post: {
      body: {
        quoteId: "12345678",
        transactionId: "2345678",
        transactionRequestId: "3456789",
        payee: {
          partyIdInfo: {
            partyIdType: "MSISDN",
            partyIdentifier: "4567890",
            dateOfBirth: "1980-01-01"
          },
          merchantClassificationCode: "4321",
          name: "Payee Name",
          supportedCurrencies: [
            "XTS",
            "XDT"
          ]
        },
        payer: {
          partyIdInfo: {
            partyIdType: "MSISDN",
            partyIdentifier: "987654321",
            fspId: "dfsp2",
            dateOfBirth: "1970-01-01"
          },
          name: "Payer Name",
          supportedCurrencies: [
            "XXX",
            "XXY"
          ]
        },
        amountType: "SEND",
        fees: {
          currency: "USD",
          amount: 5
        },
        currencyConversion: {
          sourceAmount: {}
        },
        amount: {
          currency: "USD",
          amount: "100"
        },
        note: "Test note",
        expiration: "2020-01-01T00:00:00Z",
        transactionType: {
          scenario: "DEPOSIT"
        }
      }
    },
    put: {
      body: {
        transferAmount: {
          currency: "AED",
          amount: "123.45"
        },
        payeeReceiveAmount: {
          currency: "AED",
          amount: "123.45"
        },
        payeeFspCommission: {
          currency: "AED",
          amount: "123.45"
        },
        expiration: "2016-05-24T08:38:08.699-04:00",
        ilpPacket: {
          condition: "_Bn2Rc51-Zo5kPnZkmqr0Oecxk3Ig1pYgeK4SdV49zh"
        },
        condition: "_Bn2Rc51-Zo5kPnZkmqr0Oecxk3Ig1pYgeK4SdV49zh"
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: "5100",
          errorDescription: "string"
        }
      }
    }
  },
  fxQuotes: {
    post: {
      body: {
        conversionRequestId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
        conversionTerms: {
          conversionId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
          determiningTransferId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
          initiatingFsp: "string",
          counterPartyFsp: "string",
          amountType: "RECEIVE",
          sourceAmount: {
            currency: "AED",
            amount: "123.45"
          },
          targetAmount: {
            currency: "AED",
            amount: "123.45"
          },
          expiration: "2016-05-24T08:38:08.699-04:00"
        }
      }
    },
    put: {
      body: {
        condition: "g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1",
        conversionTerms: {
          conversionId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
          determiningTransferId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
          initiatingFsp: "string",
          counterPartyFsp: "string",
          amountType: "RECEIVE",
          sourceAmount: {
            currency: "AED",
            amount: "123.45"
          },
          targetAmount: {
            currency: "AED",
            amount: "123.45"
          },
          expiration: "2016-05-24T08:38:08.699-04:00"
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: "5100",
          errorDescription: "string"
        }
      }
    }
  },
  transfers: {
    post: {
      body: {
        transferId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
        payeeFsp: "string",
        payerFsp: "string",
        amount: {
          currency: "AED",
          amount: "123.45"
        },
        ilpPacket: "AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA",
        expiration: "2016-05-24T08:38:08.699-04:00"
      }
    },
    patch: {
      body: {
        completedTimestamp: "2016-05-24T08:38:08.699-04:00",
        transferState: "RESERVED"
      }
    },
    put: {
      body: {
        fulfilment: "WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8",
        completedTimestamp: "2016-05-24T08:38:08.699-04:00",
        transferState: "RESERVED"
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: "5100",
          errorDescription: "string"
        }
      }
    }
  },
  fxTransfers: {
    post: {
      body: {
        commitRequestId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
        determiningTransferId: "b51ec534-ee48-4575-b6a9-ead2955b8069",
        initiatingFsp: "string",
        counterPartyFsp: "string",
        sourceAmount: {
          currency: "AED",
          amount: "123.45"
        },
        targetAmount: {
          currency: "AED",
          amount: "123.45"
        },
        condition: "re58GF7B9AMzwlULedVdVWidOTJGmModEMX6Npe0Pvz",
        expiration: "2016-05-24T08:38:08.699-04:00"
      }
    },
    patch: {
      body: {
        completedTimestamp: "2016-05-24T08:38:08.699-04:00"
      }
    },
    put: {
      body: {
        fulfilment: "WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8",
        completedTimestamp: "2016-05-24T08:38:08.699-04:00"
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: "5100",
          errorDescription: "string"
        }
      }
    }
  }
}
 
 describe('FSPIOPISO20022TransformFacade tests', () => {
   const testCase = (source: unknown, transformerFn: TransformFacadeFunction, expectedTarget: unknown = null) => {
     return async () => {
       const target = await transformerFn(source, {});
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
      const promise = FspiopIso20022TransformFacade.parties.put(fspiopIso20022.parties.put);
      await expect(promise).rejects.toThrow();
      expect(logger.error).toBeCalled();
    });
  })
   describe('Parties', () => {
     test('should transform PUT parties payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.parties.put, FspiopIso20022TransformFacade.parties.put, expectedFspiop.parties.put)();
     });
     test('should transform PUT parties error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.parties.putError, FspiopIso20022TransformFacade.parties.putError, expectedFspiop.parties.putError)();
     });
   })
   describe('Quotes', () => {
     test('should transform POST quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.quotes.post, FspiopIso20022TransformFacade.quotes.post, expectedFspiop.quotes.post)();
     });
     test('should transform PUT quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.quotes.put, FspiopIso20022TransformFacade.quotes.put, expectedFspiop.quotes.put)();
     });
     test('should transform PUT quotes error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.quotes.putError, FspiopIso20022TransformFacade.quotes.putError, expectedFspiop.quotes.putError)();
     });
   })
   describe('FXQuotes', () => {
     test('should transform POST FX quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxQuotes.post, FspiopIso20022TransformFacade.fxQuotes.post, expectedFspiop.fxQuotes.post)();
     })
     test('should transform PUT FX quotes payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxQuotes.put, FspiopIso20022TransformFacade.fxQuotes.put, expectedFspiop.fxQuotes.put)();
     })
     test('should transform PUT FX quotes error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxQuotes.putError, FspiopIso20022TransformFacade.fxQuotes.putError, expectedFspiop.fxQuotes.putError)();
     })
   })
   describe('Transfers', () => {
     test('should transform POST transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.post, FspiopIso20022TransformFacade.transfers.post, expectedFspiop.transfers.post)();
     })
     test('should transform PATCH transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.patch, FspiopIso20022TransformFacade.transfers.patch, expectedFspiop.transfers.patch)();
     })
     test('should transform PUT transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.put, FspiopIso20022TransformFacade.transfers.put, expectedFspiop.transfers.put)();
     })
     test('should transform PUT transfers error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.transfers.putError, FspiopIso20022TransformFacade.transfers.putError, expectedFspiop.transfers.putError)();
     })
   })
   describe('FXTransfers', () => {
     test('should transform POST FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.post, FspiopIso20022TransformFacade.fxTransfers.post, expectedFspiop.fxTransfers.post)();
     })
     test('should transform PATCH FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.patch, FspiopIso20022TransformFacade.fxTransfers.patch, expectedFspiop.fxTransfers.patch)();
     })
     test('should transform PUT FX transfers payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.put, FspiopIso20022TransformFacade.fxTransfers.put, expectedFspiop.fxTransfers.put)();
     })
     test('should transform PUT FX transfers error payload from FSPIOP ISO 20022 to FSPIOP', async () => {
       await testCase(fspiopIso20022.fxTransfers.putError, FspiopIso20022TransformFacade.fxTransfers.putError, expectedFspiop.fxTransfers.putError)();
     })
   })
 });
 