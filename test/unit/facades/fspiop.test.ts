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

import { GenericObject, Source, Target } from 'src/types';
import { TransformFacades } from '../../../src';
import * as createTransformerLib from '../../../src/lib/createTransformer';
import { fspiop, fspiopIso20022, mockLogger } from '../../fixtures';
import { getProp } from 'src/lib/utils';

const { FSPIOP: FspiopTransformFacade } = TransformFacades;

const isoTargets = (target: GenericObject) => ({
  parties: {
    put: {
      body: {
        Assgnmt: {
          MsgId: getProp(target, 'body.Assgnmt.MsgId'),
          CreDtTm: getProp(target, 'body.Assgnmt.CreDtTm'),
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: "source"
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: "destination"
                }
              }
            }
          }
        },
        Rpt: {
          Vrfctn: true,
          OrgnlId: "subId",
          UpdtdPtyAndAcctId: {
            Pty: {
              Id: {
                PrvId: {
                  Othr: {
                    SchmeNm: {
                      Prtry: "MSISDN"
                    },
                    Id: "16135551212"
                  }
                }
              },
              Nm: "party-name"
            },
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: "FSPID"
                }
              }
            },
            Acct: {
              Ccy: [
                "AED"
              ]
            }
          }
        }
      }
    },
    putError: {
      body: {
        Rpt: {
          Rsn: {
            Cd: "3100"
          },
          OrgnlId: "subId",
          Vrfctn: false
        },
        Assgnmt: {
          MsgId: getProp(target, 'body.Assgnmt.MsgId'),
          CreDtTm: getProp(target, 'body.Assgnmt.CreDtTm'),
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: "source"
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: "destination"
                }
              }
            }
          }
        }
      }
    }
  },
  quotes: {
    post: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: 1,
          PmtInstrXpryDtTm: "2020-01-01T00:00:00Z",
          SttlmInf: {
            SttlmMtd: "CLRG"
          },
          CdtTrfTxInf: {
            Purp: {
              Prtry: "DEPOSIT"
            }
          }
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: "12345678",
            EndToEndId: "2345678"
          },
          Cdtr: {
            Id: {
              PrvId: {
                Othr: {
                  SchmeNm: {
                    Prtry: "MSISDN"
                  },
                  Id: "4567890"
                }
              }
            },
            Name: "Payee Name"
          },
          CdtrAcct: {
            Ccy: [
              "XTS",
              "XDT"
            ]
          },
          Dbtr: {
            Id: {
              PrvId: {
                Othr: {
                  SchmeNm: {
                    Prtry: "MSISDN"
                  },
                  Id: "987654321"
                }
              }
            },
            Name: "Payer Name",
            Acct: {
              Ccy: [
                "XXX",
                "XXY"
              ]
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: "dfsp2"
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: "USD",
            ActiveCurrencyAndAmount: "100"
          },
          ChrgBr: "CRED"
        }
      }
    },
    put: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: 1,
          PmtInstrXpryDtTm: "2016-05-24T08:38:08.699-04:00",
          SttlmInf: {
            SttlmMtd: "CLRG"
          }
        },
        CdtTrfTxInf: {
          IntrBkSttlmAmt: {
            Ccy: "AED",
            ActiveCurrencyAndAmount: "123.45"
          },
          InstdAmt: {
            Ccy: "AED",
            ActiveCurrencyAndAmount: "123.45"
          },
          ChrgsInf: {
            Amt: {
              Ccy: "AED"
            }
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: "AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA"
          }
        }
      }
    },
    putError: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm')
        },
        TxInfAndSts: {
          StsRsnInf: {
            Rsn: {
              Cd: "3100"
            }
          }
        }
      }
    }
  },
  transfers: {
    post: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: 1,
          SttlmInf: {
            SttlmMtd: "CLRG"
          },
          PmtInstrXpryDtTm: "2016-05-24T08:38:08.699-04:00"
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: "b51ec534-ee48-4575-b6a9-ead2955b8069"
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: "payeefsp"
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: "payerfsp"
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: "XXX",
            ActiveCurrencyAndAmount: "123.45"
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: "AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA"
          }
        }
      }
    },
    patch: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm')
        },
        TxInfAndSts: {
          PrcgDt: {
            DtTm: "2016-05-24T08:38:08.699-04:00"
          },
          TxSts: "RESERVED"
        }
      }
    },
    put: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm')
        },
        TxInfAndSts: {
          ExctnConf: "WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8",
          PrcgDt: {
            DtTm: "2016-05-24T08:38:08.699-04:00"
          },
          TxSts: "RESERVED"
        }
      }
    },
    putError: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm')
        },
        TxInfAndSts: {
          StsRsnInf: {
            Rsn: {
              Cd: "3100"
            }
          }
        }
      }
    }
  }
})

const expected = (prop: string) => {
  return (target: GenericObject) => {
    return getProp(isoTargets(target), prop);
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
      vi.spyOn(createTransformerLib, 'createTransformer').mockImplementationOnce(async () => { 
        throw new Error('Test error')
      });
      const promise = FspiopTransformFacade.parties.put(fspiop.parties.put);
      await expect(promise).rejects.toThrow();
      expect(logger.error).toBeCalled();
    });
  })
  describe('Parties', () => {
    test('should transform PUT parties payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.parties.put, FspiopTransformFacade.parties.put, expected('parties.put'))();
    });
    test('should transform PUT parties error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.parties.putError, FspiopTransformFacade.parties.putError, expected('parties.putError'))();
    });
  })
  describe('Quotes', () => {
    test('should transform POST quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.quotes.post, FspiopTransformFacade.quotes.post, expected('quotes.post'))();
    });
    test('should transform PUT quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.quotes.put, FspiopTransformFacade.quotes.put, expected('quotes.put'))();
    });
    test('should transform PUT quotes error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.quotes.putError, FspiopTransformFacade.quotes.putError, expected('quotes.putError'))();
    });
  })
  describe('Transfers', () => {
    test('should transform POST transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.post, FspiopTransformFacade.transfers.post, expected('transfers.post'))();
    })
    test('should transform PATCH transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.patch, FspiopTransformFacade.transfers.patch, expected('transfers.patch'))();
    })
    test('should transform PUT transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.put, FspiopTransformFacade.transfers.put, expected('transfers.put'))();
    })
    test('should transform PUT transfers error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.transfers.putError, FspiopTransformFacade.transfers.putError, expected('transfers.putError'))();
    })
  })
  describe('FXQuotes', () => {
    test('should transform POST FX quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxQuotes.post, FspiopTransformFacade.fxQuotes.post)();
    })
    test('should transform PUT FX quotes payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxQuotes.put, FspiopTransformFacade.fxQuotes.put)();
    })
    test('should transform PUT FX quotes error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxQuotes.putError, FspiopTransformFacade.fxQuotes.putError)();
    })
  })
  describe('FXTransfers', () => {
    test('should transform POST FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.post, FspiopTransformFacade.fxTransfers.post)();
    })
    test('should transform PATCH FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.patch, FspiopTransformFacade.fxTransfers.patch)();
    })
    test('should transform PUT FX transfers payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.put, FspiopTransformFacade.fxTransfers.put)();
    })
    test('should transform PUT FX transfers error payload from FSPIOP to FSPIOP ISO 20022', async () => {
      await testCase(fspiop.fxTransfers.putError, FspiopTransformFacade.fxTransfers.putError)();
    })
  })
});
