// DO NOT REVIEW THIS FILE, IT IS FOR RANDOM TESTS
// import { State } from 'src/types/map-transform';
// import { createTransformer } from '../../src/lib';
// import { CustomTransforms } from '../../src/lib/transforms';

// import { CustomTransforms, createTransformer } from 'src/lib';
// import { State } from 'src/types/map-transform';
// const mapTransform = require('map-transform-cjs').default;

// import { CustomTransforms, createTransformer } from 'src/lib';
// import { State } from 'src/types/map-transform';

import { TransformFacades } from '../../src';


describe('Random tests', () => {
  it('dummy trst', async () => {
    expect(true).toBeTruthy();
  });
  // it.skip('should ... test generator transform functions', async () => {
  //   const discovery = {
  //     parties: {
  //       put: `{
  //         "Assgnmt.MsgId": { "$transform": "generateID"  },
  //         "Assgnmt.CreDtTm": { "$transform": "datetimeNow"  },
  //         "Assgnmt.id": ["iden", { "$transform": "padLeft" }]
  //       }`
  //     }
  //   }
  //   const padLeft = (options: any) => () => (value: any) => {
  //     return value ? value.padStart(20, '0') : value;
  //   }
  //   CustomTransforms.padLeft = padLeft;

  //   const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms }
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } })

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *  generateId for Assgnmt.MsgId,
  //    *  datetimeNow for Assgnmt.CreDtTm,
  //    *  Assgnmt.id should be padded left from iden field
  //    * 
  //    */
  //   const sourceFspiop = {
  //     iden: '123',
  //   }
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    * generatedId field should be removed
  //    * datetimeNow field should be removed
  //    * iden should be padded left from Assgnmt.id field
  //    */
  //   const source = {
  //     Assgnmt: {
  //       MsgId: '123',
  //       CreDtTm: '2021-08-10T07:00:00Z',
  //       id: '123'
  //     }
  //   };
  //   const target = await transformer.transform(source, { mapperOptions: { rev: true } as State });
  //   expect(target).toBeTruthy();
  // })
  // it.skip('should ... test filters', async () => {
  //   const discovery = {
  //     parties: {
  //       put: {
  //         "$noDefaults": true,
  //         "Assgnmt.MsgId": ["partyIdInfo.partyIdType", { $filter: "isPersonPartyIdType" }],
  //         "Assgnmt.CreDtTm": ["partyIdInfo.partyIdType", { $filter: "isNotPersonPartyIdType" }]
  //       }
  //     }
  //   }
  //   const isBusinessParty = (value: any) => {
  //     return value && ['BUSINESS', 'ALIAS', 'DEVICE'].includes(value);
  //   }
  //   const isPersonPartyIdType = (options: any) => () => (value: any, option: State) => {
  //     return !isBusinessParty(value);
  //   }
  //   const isNotPersonPartyIdType = (options: any) => () => (value: any) => {
  //     return isBusinessParty(value);
  //   }

  //   CustomTransforms.isPersonPartyIdType = isPersonPartyIdType;
  //   CustomTransforms.isNotPersonPartyIdType = isNotPersonPartyIdType;

  //   const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms }
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } })

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *  Assgnmt.CreDtTm should be set to BUSINESS
  //    *  Assgnmt.MsgId should be set to undefined or removed 
  //    */
  //   const sourceFspiop = {
  //     partyIdInfo: {
  //       partyIdType: 'BUSINESS',
  //     },
  //   }
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    * partyInfo.partyIdType should be set to BUSINESS from Assgnmt.CreDtTm
  //    */
  //   const sourceIso = {
  //     Assgnmt: {
  //       MsgId: 'PERSON',
  //       CreDtTm: 'BUSINESS',
  //     }
  //   };
  //   const targetFspiop = await transformer.transform(sourceIso, { mapperOptions: { rev: true } as State });
  //   expect(targetFspiop).toBeTruthy();
  // })
  // it.skip('should ... map to constant', async () => {
  //   const discovery = {
  //     parties: {
  //       put: `{
  //         "$noDefaults": "true",
  //         "Rpt.Vrfctn": [{ "$transform": "fixed", "value": true, "$direction": "fwd" }, { "$transform": "fixed", "value": "**undefined**", "$direction": "rev" }]
  //       }`
  //     }
  //   }

  //   const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms }
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } })

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *  Rpt.Vrfctn should be set to TRUE
  //    */
  //   const sourceFspiop = {
  //     partyIdInfo: {
  //       partyIdType: 'BUSINESS',
  //     },
  //     iden: '123'
  //   }
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   console.log(targetIso);
  //   //expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    * No field should be mapped, should return undefined
  //    */
  //   const sourceIso = {
  //     Rpt: {
  //       Vrfctn: true
  //     }
  //   };
  //   const targetFspiop = await transformer.transform(sourceIso, { mapperOptions: { rev: true } as State });
  //   expect(targetFspiop).toBeFalsy();
  // })
  // it.skip('should ... map with mulltiple filters', async () => {
  //   // const discovery = {
  //   //   parties: {
  //   //     put: `{
  //   //       "$noDefaults": "true",
  //   //       "Rpt.org": ["partyIdInfo.partyIdentifier", { "$filter": "isNotPersonParty", "path": "partyIdInfo.partyIdType" }],
  //   //       "Rpt.person": ["partyIdInfo.partyIdentifier", { "$filter": "isPersonParty", "path": "partyIdInfo.partyIdType" }],
  //   //       "Rpt.personAlt": ["partyIdInfo.partyIdentifier", { "$filter": "isPersonParty", "path": "partyIdInfo.partyIdType" }, { "$filter": "isNotEmpty", "path": "partyIdInfo.partyIdType"}]
  //   //     }`
  //   //   }
  //   // }

  //   const discovery = {
  //     parties: {
  //       put: {
  //         $noDefaults: true,
  //         "Rpt.org": ["partyIdInfo.partyIdentifier", { $filter: "compare", path: "partyIdInfo.partyIdType", match: "PERSON" }]
  //       }
  //     }
  //   }

  //   // const discovery = {
  //   //   parties: {
  //   //     put: `{
  //   //       "$noDefaults": true,
  //   //       "Rpt.org": ["partyIdInfo.partyIdentifier", { "$filter": "compare",  "path": "partyIdInfo.partyIdType", "operator": "=", "match": "PERSON" }]
  //   //     }`
  //   //   }
  //   // }

  //   const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms }
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } })

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *   - 
  //    */
  //   const sourceFspiop = {
  //     partyIdInfo: {
  //       partyIdType: 'PERSON',
  //       partyIdentifier: '123'
  //     }
  //   }
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   console.log(targetIso);
  //   //expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    *  - 
  //    */
  //   const sourceIso = {
  //     Rpt: {
  //       org: '234',
  //       person: '1234',
  //       personAlt: '12345'
  //     }
  //   };
  //   const targetFspiop = await transformer.transform(sourceIso, { mapperOptions: { rev: true } as State });
  //   expect(targetFspiop).toBeFalsy();
  // })
  // it.only('should ... map to dashed properties', async () => {
  //   const discovery = {
  //     parties: {
  //       put: `{
  //         "$noDefaults": "true",
  //         "Rpt.source": "header.fspiop-source",
  //         "Rpt.dest": "header.fspiop-destination"
  //       }`
  //     }
  //   }

  //   const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms }
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } })

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *   - 
  //    */
  //   const sourceFspiop = {
  //     body: {},
  //     header: {
  //       'fspiop-source': '123',
  //       'fspiop-destination': '234'
  //     }
  //   }
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   console.log(targetIso);
  //   //expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    *  - 
  //    */
  //   const sourceIso = {
  //     body: {
  //       Rpt: {
  //         source: '234',
  //         dest: '1234'
  //       }
  //     }
  //   };
  //   const targetFspiop = await transformer.transform(sourceIso, { mapperOptions: { rev: true } as State });
  //   expect(targetFspiop).toBeFalsy();
  // }),
  // it('should ... map to dashed properties', async () => {
  //   const discovery = {
  //     parties: {
  //       put: `{
  //         "$noDefaults": "true",
  //         "body.Rpt.source": "header.fspiop-source",
  //         "body.Rpt.dest": "header.fspiop-destination",
  //         "body.Rpt.id": "body.iden",
  //         "body.Rpt.Vrfctn": [{ "$transform": "fixed", "value": true, "$direction": "fwd" }, { "$transform": "fixed", "value": "**undefined**", "$direction": "rev" }],
  //         "body.Assgnmt.MsgId": [{ "$transform": "generateID", "$direction": "fwd" }, { "$value": "**undefined**", "$direction": "rev" }]
  //       }`
  //     }
  //   };

  //   const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms };
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } });

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *   - 
  //    */
  //   const sourceFspiop = {
  //     body: {
  //       iden: '5678'
  //     },
  //     header: {
  //       'fspiop-source': '123',
  //       'fspiop-destination': '234'
  //     }
  //   };
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   //console.log(targetIso);
  //   //expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    *  - 
  //    */
  //   const sourceIso = {
  //     body: {
  //       Rpt: {
  //         source: '234',
  //         dest: '1234',
  //         id: '567899'
  //       }
  //     }
  //   };
  //   const targetFspiop = await transformer.transform(sourceIso, { mapperOptions: { rev: true } as State });
  //   expect(targetFspiop).toBeFalsy();
  // });
  // it.skip('should ... test if-then-else', async () => {
  //   const { ifelse , set} = mapTransform;
  //   // const discovery = {
  //   //   parties: {
  //   //     put: `{
  //   //       "$noDefaults": "true",
  //   //       "Rpt.source": "header.fspiop-source",
  //   //       "Rpt.dest": "header.fspiop-destination",
  //   //       "Rpt.id": { "$if": "body.map", "then": "123", "else": "456" }
  //   //     }`
  //   //   }
  //   // }

  //   const isMap2 = (value: any) => {
  //     return value?.body?.map ? true : false;
  //   };

  //   const isMap = (options: any) => () => (value: any) => {
  //     return value?.body?.map ? true : false;
  //   };

  //   CustomTransforms.isMap = isMap;
  //   CustomTransforms.isMap2 = isMap2 as any;

  //   const discovery = {
  //     parties: {
  //       put: {
  //         $noDefaults: true,
  //         'Rpt.source': 'header.fspiop-source',
  //         'Rpt.dest': 'header.fspiop-destination',
  //         'Rpt.id': { ifelse: 'isMap', then: '123', else: '456' }
  //       }
  //     }
  //   };

  //   const mapping = [
  //     'body',
  //     {
  //       'Rpt.source': 'header.fspiop-source',
  //       'Rpt.dest': 'header.fspiop-destination'
  //     },
  //     {
  //       $if: 'isMap2',
  //       then: { $value: '123' },
  //       else: { $value: '456' }
  //     }
  //   ];

  //   // const mapping = [
  //   //   'body',
  //   //   {
  //   //     'Rpt.source': 'header.fspiop-source',
  //   //     'Rpt.dest': 'header.fspiop-destination'
  //   //   },
  //   //   ifelse(isMap2 as any, set('Rpt.id'), set('Rpt.id2'))
  //   // ]

  //   // const mapping = discovery.parties.put;
  //   const transformers = { ...CustomTransforms };
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } });

  //   /**
  //    *  FORWARD CASE
  //    *  When transforming from FSPIOP to ISO, 
  //    *   - 
  //    */
  //   const sourceFspiop = {
  //     body: {
  //       iden: '5678',
  //       map: true
  //     },
  //     header: {
  //       'fspiop-source': '123',
  //       'fspiop-destination': '234'
  //     }
  //   };
  //   const targetIso = await transformer.transform(sourceFspiop, {});
  //   console.log(targetIso);
  //   //expect(targetIso).toBeTruthy();

  //   /**
  //    * REVERSE CASE
  //    * When transforming from ISO to FSPIOP,
  //    *  - 
  //    */
  //   const sourceIso = {
  //     body: {
  //       Rpt: {
  //         source: '234',
  //         dest: '1234'
  //       }
  //     }
  //   };
  //   const targetFspiop = await transformer.transform(sourceIso, { mapperOptions: { rev: true } as State });
  //   expect(targetFspiop).toBeFalsy();
  // });

  // it.skip('should ... test map to multiple fields with transform on the second', async () => {    

  //   vi.stubEnv('ILP_SECRET', 'shh');
  //   vi.stubEnv('ILP_VERSION', 'v1');

  //   const mapping = {
  //     $noDefaults: true,
  //     // 'body.schemaA.condition': { $transform: 'getIlpPacketCondition', path: 'body.schemaB.ilpPacket' }
  //     'body.schemaA.condition': ['body.schemaB.ilpPacket', { $transform: 'ilpPacketToCondition' }],
  //     'body.schemaA.ilpPacket': 'body.schemaB.ilpPacket'

  //   };

  //   const transformers = { ...CustomTransforms };
  //   const transformer = await createTransformer(mapping, { mapTransformOptions: { transformers } });

  //   const schemaBsource = {
  //     body: {
  //       schemaB: {
  //         ilpPacket: 'AYIC9AAAAAAAABdwHWcucGF5ZWVmc3AubXNpc2RuLjIyNTU2OTk5MTI1ggLKZXlKMGNtRnVjMkZqZEdsdmJrbGtJam9pWmpRMFltUmtOV010WXpreE1DMDBZVGt3TFRoa05qa3RaR0ppWVRaaVl6aGxZVFpqSWl3aWNYVnZkR1ZKWkNJNklqVTBaRFZtTURsaUxXRTBOMlF0TkRCa05pMWhZVEEzTFdFNVkyWXpZbUl5TkRsaFpDSXNJbkJoZVdWbElqcDdJbkJoY25SNVNXUkpibVp2SWpwN0luQmhjblI1U1dSVWVYQmxJam9pVFZOSlUwUk9JaXdpY0dGeWRIbEpaR1Z1ZEdsbWFXVnlJam9pTWpJMU5UWTVPVGt4TWpVaUxDSm1jM0JKWkNJNkluQmhlV1ZsWm5Od0luMTlMQ0p3WVhsbGNpSTZleUp3WVhKMGVVbGtTVzVtYnlJNmV5SndZWEowZVVsa1ZIbHdaU0k2SWsxVFNWTkVUaUlzSW5CaGNuUjVTV1JsYm5ScFptbGxjaUk2SWpJeU5UQTNNREE0TVRneElpd2labk53U1dRaU9pSndZWGxsY21aemNDSjlMQ0p3WlhKemIyNWhiRWx1Wm04aU9uc2lZMjl0Y0d4bGVFNWhiV1VpT25zaVptbHljM1JPWVcxbElqb2lUV0YwY3lJc0lteGhjM1JPWVcxbElqb2lTR0ZuYldGdUluMHNJbVJoZEdWUFprSnBjblJvSWpvaU1UazRNeTB4TUMweU5TSjlmU3dpWVcxdmRXNTBJanA3SW1GdGIzVnVkQ0k2SWpZd0lpd2lZM1Z5Y21WdVkza2lPaUpWVTBRaWZTd2lkSEpoYm5OaFkzUnBiMjVVZVhCbElqcDdJbk5qWlc1aGNtbHZJam9pVkZKQlRsTkdSVklpTENKcGJtbDBhV0YwYjNJaU9pSlFRVmxGVWlJc0ltbHVhWFJwWVhSdmNsUjVjR1VpT2lKRFQwNVRWVTFGVWlKOWZRAA'
  //       }
  //     }
  //   };
  //   const schemaAtarget = await transformer.transform(schemaBsource, { });
  //   expect(schemaAtarget).toBeTruthy();
  // });

  it.skip('test put parties iso to fspiop', async () => {
    const isoSource = {
      body: {
        Assgnmt: {
          MsgId: '01J9R7Q22GXFJBEW7NQDVMHNN4',
          CreDtTm: '2024-10-09T08:53:17.006Z',
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'testingtoolkitdfsp'
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
          OrgnlId: 'MSISDN/27713803912',
          Vrfctn: true,
          UpdtdPtyAndAcctId: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'testingtoolkitdfsp'
                }
              }
            },
            Acct: {
              Ccy: 'XTS'
            },
            Pty: {
              Nm: 'Test Party',
              Id: {
                PrvtId: {
                  Othr: {
                    Id: '27713803912',
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

    const target = await TransformFacades.FSPIOPISO20022.parties.put(isoSource);
    expect(target).toBeTruthy();
  });
});