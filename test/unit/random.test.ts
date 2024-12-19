import { createTransformer } from 'src';
import { FspiopTransformFacade, FspiopIso20022TransformFacade } from '../../src/facades';

describe('Random', () => {
  it.skip('should transform with alt and fixed value', async () => {
    const mappingStr = `{
      "body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.Dbtr", "headers.fspiop-destination" ] },
      "body.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.DbtrAgt", "headers.fspiop-destination" ] },
      "body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.Cdtr", "headers.fspiop-source" ] },
      "body.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.CdtrAgt", "headers.fspiop-source" ] },
      "body.CdtTrfTxInf.ChrgBr": { "$alt": [ "$context.isoPostQuote.CdtTrfTxInf.ChrgBr", { "$transform": "fixed", "value": "SHAR" } ] }
    }`;

    const mapping = JSON.parse(mappingStr);
    const transformer = createTransformer(mapping);

    // with context
    const context = {
      isoPostQuote: {
        CdtTrfTxInf: {
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'Dbtr'
                }
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'DbtrAgt'
              }
            }
          },
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'Cdtr'
                }
              }
            }
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'CdtrAgt'
              }
            }
          },
          ChrgBr: 'ChrgBr'
        }
      }
    };

    const source = {
      body: {},
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      },
      $context: context
    };
    const target = await transformer.transform(source, {});
    /* eslint-disable-next-line */
    console.log(target);

    // without context
    const source2 = {
      body: {},
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      }
    };
    const target2 = await transformer.transform(source2, {});
    /* eslint-disable-next-line */
    console.log(target2);
  });

  it.skip('should transform with alt and fixed value', async () => {
    // with context
    const source = {
      body: {},
      params: { ID: 'id' },
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      }
    };
    const target = await FspiopTransformFacade.quotes.put(source, {});
    /* eslint-disable-next-line */
    console.log(target);
  });

  it.skip('should transform with alt and fixed value', async () => {
    const transformer = FspiopIso20022TransformFacade.parties.put;
    const request = {
      url: 'http://172.17.0.1:3001/parties/MSISDN/16135551002',
      uniqueId: '1734604735552pqveh',
      headers: {
        'Content-Type': 'application/vnd.interoperability.iso20022.parties+json;version=2.0',
        'FSPIOP-Source': 'testingtoolkitdfsp',
        Date: 'Thu, 19 Dec 2024 10:38:55 GMT',
        'FSPIOP-Destination': 'dfsp1',
        traceparent: '00-ccdd39191b8fa41a3a394824f4a9b1-0123456789abcdef0-00'
      },
      body: {
        Assgnmt: {
          MsgId: '01JFF7ZH1Z5J2A7RP7B2MC59HE',
          CreDtTm: '2024-12-19T10:38:55.546Z',
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'dfsp1'
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'testingtoolkitdfsp'
                }
              }
            }
          }
        },
        Rpt: {
          OrgnlId: 'MSISDN/16135551002',
          Vrfctn: true,
          UpdtdPtyAndAcctId: {
            Agt: {
              FinInstnId: {
                LEI: '529900T8BM49AURSDO55',
                Othr: {
                  Id: 'ttkpayeefsp'
                }
              }
            },
            Acct: {
              Ccy: 'XTS'
            },
            Pty: {
              PstlAdr: {
                StrtNm: '1',
                PstCd: 'XXXXXX',
                Ctry: 'ZM',
                AdrLine: 'Main road, Big Town'
              },
              CtryOfRes: 'ZM',
              Nm: 'Test Party',
              Id: {
                PrvtId: {
                  Othr: {
                    Id: '16135551002',
                    SchmeNm: {
                      Prtry: 'MSISDN'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const source = {
      body: request.body,
    };
    const target = await transformer(source, { rollUpUnmappedAsExtensions: true  });
    /* eslint-disable-next-line */
    console.log(target);

    // without context
    const source2 = {
      body: {},
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      }
    };
    const target2 = await transformer(source2, {});
    /* eslint-disable-next-line */
    console.log(target2);
  });

});
