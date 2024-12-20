/*****
 License
 --------------
 Copyright © 2020-2024 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not 
 use these files except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES 
 OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 
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

import { FspiopTransformFacade, FspiopIso20022TransformFacade } from 'src/facades';
import { applyUnrollExtensions, applyRollUpUnmappedAsExtensions } from '../../../../src/lib/transforms/extensions';
import { mockLogger, fspiopSources } from '../../../fixtures';

describe('Extensions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe('applyUnrollExtensions', () => {
    it('should return target without unrolling extensions if unrollExtensions is false', () => {
      const source = {
        body: {
          extensionList: {
            extension: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: false
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping unrollExtensions', { source, target, options });
    });
    it('should return target without unrolling extensions if source.body.extensionList.extension is falsy', () => {
      const source = {
        body: {
          extensionList: {}
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping unrollExtensions', { source, target, options });
    });
    it('should return target with unrolled extensions', () => {
      const source = {
        body: {
          extensionList: {
            extension: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should return target with unrolled extensions and merge them with existing keys', () => {
      const source = {
        body: {
          extensionList: {
            extension: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue',
          extensionKey: 'existingValue'
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should return target with unrolled extensions and merge them with existing nested keys', () => {
      const source = {
        body: {
          extensionList: {
            extension: [{ key: 'nested.extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue',
          nested: {
            extensionKey: 'existingValue'
          }
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          nested: {
            extensionKey: 'extensionValue'
          }
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { nested: { extensionKey: 'extensionValue' } } });
    });
    it('should unroll extensions in errorInformation without specifying extension list path', () => {
      const source = {
        body: {
          errorInformation: {
            extensionList: {
              extension: [{ key: 'extensionKey', value: 'extensionValue' }]
            }
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: true,
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should unroll extensions from a different property path', () => {
      const source = {
        body: {
          customProp: {
            extensionList: {
              extension: [{ key: 'extensionKey', value: 'extensionValue' }]
            }
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: true,
        applyUnrollExtensions: {
          extensionListProperty: 'body.customProp.extensionList'
        }
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
  });
  describe('applyRollUpUnmappedAsExtensions', () => {
    it('should return target without rolling up extensions if rollUpUnmappedAsExtensions is false', () => {
      const source = {
        body: {
          targetKey: 'sourceValue'
        }
      };
      const target = {
        body: {
          key1: 'value1'
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const options = {
        rollUpUnmappedAsExtensions: false,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping rollUpUnmappedAsExtensions', { source, target, mapping, options });
    });
    it('should return target without rolling up extensions if extensions is empty', () => {
      const source = {
        body: {
          targetKey: 'sourceValue'
        }
      };
      const target = {
        body: {
          key1: 'value1'
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('No unmapped properties to roll up', { source, mapping });
    });
    it('should return target with rolled up extensions', () => {
      const source = {
        body: {
          targetKey: 'targetValue',
          unmappedKey1: 'unmappedValue1'
        }
      };
      const target = {
        body: {
          sourceKey: 'sourceValue'
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const expectedTarget = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [{ key: 'unmappedKey1', value: 'unmappedValue1' }]
          }
        }
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(expectedTarget);
    });
    it('should return target with rolled up extensions and merge them with existing extensions', () => {
      const source = {
        body: {
          targetKey: 'targetValue',
          unmappedKey1: 'unmappedValue1'
        }
      };
      const target = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [{ key: 'unmappedKey2', value: 'unmappedValue2' }]
          }
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const expectedTarget = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [
              { key: 'unmappedKey2', value: 'unmappedValue2' },
              { key: 'unmappedKey1', value: 'unmappedValue1' }
            ]
          }
        }
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(expectedTarget);
    });
    it('should return target with rolled up extensions and merge them with existing extensions with same key', () => {
      const source = {
        body: {
          targetKey: 'targetValue',
          unmappedKey1: 'unmappedValue1'
        }
      };
      const target = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [{ key: 'unmappedKey1', value: 'existingValue' }]
          }
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const expectedTarget = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [
              { key: 'unmappedKey1', value: 'existingValue' }
            ]
          }
        }
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(expectedTarget);
    });
  });
  describe('discovery extensions', () => {
    describe('rollUpUnmappedAsExtensions', () => {
      describe('put parties', () => {
        it('should roll up unmapped as extensions', async () => {
          const transformer = FspiopIso20022TransformFacade.parties.put;
          const request = {
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
          expect(target.body.party.partyIdInfo.extensionList.extension.length).toEqual(9);
          expect(target.body.party.partyIdInfo.extensionList.extension).toEqual([
            {
              "key": "Assgnmt.MsgId",
              "value": "01JFF7ZH1Z5J2A7RP7B2MC59HE"
            },
            {
              "key": "Assgnmt.CreDtTm",
              "value": "2024-12-19T10:38:55.546Z"
            },
            {
              "key": "Rpt.Vrfctn",
              "value": true
            },
            {
              "key": "Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.LEI",
              "value": "529900T8BM49AURSDO55"
            },
            {
              "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.StrtNm",
              "value": "1"
            },
            {
              "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.PstCd",
              "value": "XXXXXX"
            },
            {
              "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.Ctry",
              "value": "ZM"
            },
            {
              "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.AdrLine",
              "value": "Main road, Big Town"
            },
            {
              "key": "Rpt.UpdtdPtyAndAcctId.Pty.CtryOfRes",
              "value": "ZM"
            }
          ]);
        });
      });
    });
    describe('unrollExtensions', () => {
      describe('put parties', () => {
        it('should unroll extensions', async () => {
          const transformer = FspiopTransformFacade.parties.put;
          const request = {
            ...fspiopSources.parties.put,
          };
          (request.body.party.partyIdInfo as any).extensionList = {
            extension: [
              {
                "key": "Assgnmt.MsgId",
                "value": "01JFF7ZH1Z5J2A7RP7B2MC59HE"
              },
              {
                "key": "Assgnmt.CreDtTm",
                "value": "2024-12-19T10:38:55.546Z"
              },
              {
                "key": "Rpt.Vrfctn",
                "value": true
              },
              {
                "key": "Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.LEI",
                "value": "529900T8BM49AURSDO55"
              },
              {
                "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.StrtNm",
                "value": "1"
              },
              {
                "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.PstCd",
                "value": "XXXXXX"
              },
              {
                "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.Ctry",
                "value": "ZM"
              },
              {
                "key": "Rpt.UpdtdPtyAndAcctId.Pty.PstlAdr.AdrLine",
                "value": "Main road, Big Town"
              },
              {
                "key": "Rpt.UpdtdPtyAndAcctId.Pty.CtryOfRes",
                "value": "ZM"
              }
            ]
          }
      
          const source = request;
          const target = await transformer(source, { unrollExtensions: true  });
          expect(target.body).toEqual({
            "Assgnmt": {
              "MsgId": "01JFF7ZH1Z5J2A7RP7B2MC59HE",
              "CreDtTm": "2024-12-19T10:38:55.546Z",
              "Assgnr": {
                "Agt": {
                  "FinInstnId": {
                    "Othr": {
                      "Id": "source"
                    }
                  }
                }
              },
              "Assgne": {
                "Agt": {
                  "FinInstnId": {
                    "Othr": {
                      "Id": "destination"
                    }
                  }
                }
              }
            },
            "Rpt": {
              "Vrfctn": true,
              "UpdtdPtyAndAcctId": {
                "Agt": {
                  "FinInstnId": {
                    "LEI": "529900T8BM49AURSDO55",
                    "Othr": {
                      "Id": "FSPID"
                    }
                  }
                },
                "Pty": {
                  "PstlAdr": {
                    "StrtNm": "1",
                    "PstCd": "XXXXXX",
                    "Ctry": "ZM",
                    "AdrLine": "Main road, Big Town"
                  },
                  "CtryOfRes": "ZM",
                  "Id": {
                    "PrvtId": {
                      "Othr": {
                        "SchmeNm": {
                          "Prtry": "MSISDN"
                        },
                        "Id": "16135551212"
                      }
                    }
                  },
                  "Nm": "party-name"
                },
                "Acct": {
                  "Ccy": "AED"
                }
              },
              "OrgnlId": "MSISDN/16135551212/subId"
            }
          });
        });
      });
    });
  });
});
