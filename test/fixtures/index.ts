import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { getProp } from 'src/lib/utils';
import { GenericObject } from 'src/types';

export const mockLogger = {
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  verbose: vi.fn(),
  debug: vi.fn(),
  silly: vi.fn(),
  audit: vi.fn(),
  trace: vi.fn(),
  perf: vi.fn(),
  child: vi.fn().mockReturnThis(),
  setLevel: vi.fn(),
  isLevelEnabled: vi.fn(),
  isErrorEnabled: true,
  isWarnEnabled: true,
  isInfoEnabled: true,
  isVerboseEnabled: true,
  isDebugEnabled: true,
  isSillyEnabled: true,
  isAuditEnabled: true,
  isTraceEnabled: true,
  isPerfEnabled: true
} as ContextLogger;

export const ilpPacket = 'DIIDSgAAAAAAAMNQMjAxNzExMTUyMzE3Mjg5ODVPqz_E707Be6heJ0uDF-up-UEj013dNAKkU1Xy0buXqQpnLm1vamFsb29wggMDZXlKeGRXOTBaVWxrSWpvaU1qQTFNRGd4T0RZdE1UUTFPQzAwWVdNd0xXRTRNalF0WkRSaU1EZGxNemRrTjJJeklpd2lkSEpoYm5OaFkzUnBiMjVKWkNJNklqSXdOVEE0TVRnMkxURTBOVGd0TkdGak1DMWhPREkwTFdRMFlqQTNaVE0zWkRkaU15SXNJblJ5WVc1ellXTjBhVzl1Vkhsd1pTSTZleUp6WTJWdVlYSnBieUk2SWxSU1FVNVRSa1ZTSWl3aWFXNXBkR2xoZEc5eUlqb2lVRUZaUlZJaUxDSnBibWwwYVdGMGIzSlVlWEJsSWpvaVEwOU9VMVZOUlZJaUxDSmlZV3hoYm1ObFQyWlFZWGx0Wlc1MGN5STZJakV4TUNKOUxDSndZWGxsWlNJNmV5SndZWEowZVVsa1NXNW1ieUk2ZXlKd1lYSjBlVWxrVkhsd1pTSTZJazFUU1ZORVRpSXNJbkJoY25SNVNXUmxiblJwWm1sbGNpSTZJakV5TXpRMU5qYzRPU0lzSW1aemNFbGtJam9pVFc5aWFXeGxUVzl1WlhraWZYMHNJbkJoZVdWeUlqcDdJbkJsY25OdmJtRnNTVzVtYnlJNmV5SmpiMjF3YkdWNFRtRnRaU0k2ZXlKbWFYSnpkRTVoYldVaU9pSk5ZWFJ6SWl3aWJHRnpkRTVoYldVaU9pSklZV2R0WVc0aWZYMHNJbkJoY25SNVNXUkpibVp2SWpwN0luQmhjblI1U1dSVWVYQmxJam9pVFZOSlUwUk9JaXdpY0dGeWRIbEpaR1Z1ZEdsbWFXVnlJam9pT1RnM05qVTBNeUlzSW1aemNFbGtJam9pUW1GdWEwNXlUMjVsSW4xOUxDSmxlSEJwY21GMGFXOXVJam9pTWpBeE55MHhNUzB4TlZReU1qb3hOem95T0M0NU9EVXRNREU2TURBaUxDSmhiVzkxYm5RaU9uc2lZVzF2ZFc1MElqb2lOVEF3SWl3aVkzVnljbVZ1WTNraU9pSlZVMFFpZlgw';
export const ilpCondition = 'T6s_xO9OwXuoXidLgxfrqflBI9Nd3TQCpFNV8tG7l6k'; 

export const fspiopSources = {
  parties: {
    put: {
      body: {
        party: {
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '16135551212',
            partySubIdOrType: 'PARTY-SUBID-OR-TYPE',
            fspId: 'FSPID',
            extensionList: {
              extension: [
                {
                  key: 'ext-key',
                  value: 'ext-val'
                }
              ]
            }
          },
          merchantClassificationCode: '8',
          name: 'party-name',
          personalInfo: {
            complexName: {
              firstName: 'Henrik',
              middleName: 'Johannes',
              lastName: 'Karlsson'
            },
            dateOfBirth: '1966-06-16',
            kycInformation: `{
            "metadata": {
              "format": "JSON",
              "version": "1.0",
              "description": "Data containing KYC Information"
            },
            "data": {
              "name": "John Doe",
              "dob": "1980-05-15",
              "gender": "Male",
              "address": "123 Main Street, Anytown, USA",
              "email": "johndoe@example.com",
              "phone": "+1 555-123-4567",
              "nationality": "US",
              "passport_number": "AB1234567",
              "issue_date": "2010-02-20",
              "expiry_date": "2025-02-20",
              "bank_account_number": "1234567890",
              "bank_name": "Example Bank",
              "employer": "ABC Company",
              "occupation": "Software Engineer",
              "income": "$80,000 per year",
              "marital_status": "Single",
              "dependents": 0,
              "risk_level": "Low"
            }
          }`
          },
          supportedCurrencies: [
            'AED'
          ]
        }
      },
      headers: {
        'fspiop-source': 'source',
        'fspiop-destination': 'destination'
      },
      params: {
        SubId: 'subId'
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error'
        }
      },
      headers: {
        'fspiop-source': 'source',
        'fspiop-destination': 'destination'
      },
      params: {
        SubId: 'subId'
      }
    }
  },
  quotes: {
    post: {
      body: {
        quoteId: '12345678',
        transactionId: '2345678',
        transactionRequestId: '3456789',
        payee: {
          name: 'Payee Name',
          merchantClassificationCode: '4321',
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '4567890',
            dateOfBirth: '1980-01-01'
          },
          supportedCurrencies: ['XTS', 'XDT']
        },
        payer: {
          name: 'Payer Name',
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '987654321',
            fspId: 'dfsp2',
            dateOfBirth: '1970-01-01'
          },
          supportedCurrencies: ['XXX', 'XXY']
        },
        amountType: 'SEND',
        amount: {
          currency: 'USD',
          amount: '100'
        },
        fees: {
          currency: 'USD',
          amount: 5
        },
        transactionType: {
          initiator: 'PAYEE',
          initiatorType: 'BUSINESS',
          scenario: 'DEPOSIT'
        },
        expiration: '2020-01-01T00:00:00Z',
        note: 'Test note'
      }
    },
    put: {
      body: {
        transferAmount: {
          currency: 'AED',
          amount: '123.45'
        },
        payeeReceiveAmount: {
          currency: 'AED',
          amount: '123.45'
        },
        payeeFspFee: {
          currency: 'AED',
          amount: '123.45'
        },
        expiration: '2016-05-24T08:38:08.699-04:00',
        geoCode: {
          latitude: '+45.4215',
          longitude: '+75.6972'
        },
        ilpPacket,
        condition: 'T6s_xO9OwXuoXidLgxfrqflBI9Nd3TQCpFNV8tG7l6k',
        extensionList: {
          extension: [
            {
              key: 'extKey1',
              value: 'extVal1'
            }
          ]
        }
      },
      headers: {
        'fspiop-source': 'sourcefsp',
        'fspiop-destination': 'destinationfsp'
      },
      params: {
        ID: '12345678'
      },
      $context: {
        isoPostQuote: {
          CdtTrfTxInf: {
            ChrgBr: 'CRED'
          }
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'string',
          extensionList: {
            extension: [
              {
                key: 'string',
                value: 'string'
              }
            ]
          }
        }
      }
    }
  },
  fxQuotes: {
    post: {
      body: {
        conversionRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        conversionTerms: {
          conversionId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          initiatingFsp: 'initfsp',
          counterPartyFsp: 'counterfsp',
          amountType: 'RECEIVE',
          sourceAmount: {
            currency: 'XXX',
            amount: '123.45'
          },
          targetAmount: {
            currency: 'XXY',
            amount: '23.55'
          },
          expiration: '2016-05-24T08:38:08.699-04:00',
          charges: [
            {
              chargeType: 'charge-type',
              sourceAmount: {
                currency: 'XXX',
                amount: '3.45'
              },
              targetAmount: {
                currency: 'XXY',
                amount: '5.65'
              }
            }
          ],
          extensionList: {
            extension: [
              {
                key: 'extKey1',
                value: 'extVal1'
              }
            ]
          }
        }
      }
    },
    put: {
      body: {
        condition: 'g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1',
        conversionTerms: {
          conversionId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          initiatingFsp: 'initfsp',
          counterPartyFsp: 'counterfsp',
          amountType: 'RECEIVE',
          sourceAmount: {
            currency: 'XXX',
            amount: '123.45'
          },
          targetAmount: {
            currency: 'XXY',
            amount: '23.55'
          },
          expiration: '2016-05-24T08:38:08.699-04:00',
          charges: [
            {
              chargeType: 'charge-type',
              sourceAmount: {
                currency: 'XXX',
                amount: '23.45'
              },
              targetAmount: {
                currency: 'XXY',
                amount: '43.45'
              }
            }
          ],
          extensionList: {
            extension: [
              {
                key: 'ext1Key',
                value: 'ext1Val'
              }
            ]
          }
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error',
          extensionList: {
            extension: [
              {
                key: 'extKey1',
                value: 'extVal1'
              }
            ]
          }
        }
      }
    }
  },
  transfers: {
    post: {
      body: {
        transferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        payeeFsp: 'payeefsp',
        payerFsp: 'payerfsp',
        amount: {
          currency: 'XXX',
          amount: '123.45'
        },
        ilpPacket,
        condition: 'T6s_xO9OwXuoXidLgxfrqflBI9Nd3TQCpFNV8tG7l6k',
        expiration: '2016-05-24T08:38:08.699-04:00',
        extensionList: {
          extension: [
            {
              key: 'extKey1',
              value: 'extVal1'
            }
          ]
        }
      }
    },
    patch: {
      body: {
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        transferState: 'RESERVED',
        extensionList: {
          extension: [
            {
              key: 'extKey1',
              value: 'extVal1'
            }
          ]
        }
      }
    },
    put: {
      body: {
        fulfilment: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        transferState: 'RESERVED',
        extensionList: {
          extension: [
            {
              key: 'extKey1',
              value: 'extVal1'
            }
          ]
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error',
          extensionList: {
            extension: [
              {
                key: 'extKey1',
                value: 'extVal1'
              }
            ]
          }
        }
      }
    }
  },
  fxTransfers: {
    post: {
      body: {
        commitRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        initiatingFsp: 'initfsp',
        counterPartyFsp: 'counterfsp',
        sourceAmount: {
          currency: 'XXX',
          amount: '123.45'
        },
        targetAmount: {
          currency: 'XXY',
          amount: '234.45'
        },
        condition: 're58GF7B9AMzwlULedVdVWidOTJGmModEMX6Npe0Pvz',
        expiration: '2016-05-24T08:38:08.699-04:00'
      }
    },
    patch: {
      body: {
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        conversionState: 'RESERVED',
        extensionList: {
          extension: [
            {
              key: 'extKey1',
              value: 'extVal1'
            }
          ]
        }
      }
    },
    put: {
      body: {
        fulfilment: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        conversionState: 'RESERVED',
        extensionList: {
          extension: [
            {
              key: 'extKey1',
              value: 'extVal1'
            }
          ]
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error',
          extensionList: {
            extension: [
              {
                key: 'extKey1',
                value: 'extVal1'
              }
            ]
          }
        }
      }
    }
  }
};

export const expectedFspiopTargets = {
  parties: {
    put: {
      headers: {
        'fspiop-source': 'source',
        'fspiop-destination': 'destination'
      },
      params: {
        SubId: 'subId'
      },
      body: {
        party: {
          partyIdInfo: {
            partyIdType: 'MSISDN',
            partyIdentifier: '16135551212',
            fspId: 'FSPID'
          },
          name: 'party-name',
          supportedCurrencies: [
            'AED'
          ]
        }
      }
    },
    putError: {
      ...fspiopSources.parties.putError
    }
  },
  quotes: {
    post: {
      body: {
        quoteId: '12345678',
        expiration: '2020-01-01T00:00:00Z',
        transactionId: '2345678',
        transactionRequestId: '3456789',
        payee: {
          partyIdInfo: {
            partyIdentifier: '4567890',
            fspId: '4321'
          },
          name: 'Payee Name',
          supportedCurrencies: [
            'XTS',
            'XDT'
          ]
        },
        payer: {
          partyIdInfo: {
            partyIdentifier: '987654321',
            fspId: 'dfsp2'
          },
          name: 'Payer Name',
          supportedCurrencies: [
            'XXX',
            'XXY'
          ]
        },
        amount: {
          currency: 'USD',
          amount: '100'
        },
        transactionType: {
          initiator: 'PAYEE',
          initiatorType: 'BUSINESS',
          refundInfo: {
            originalTransactionId: '3456789'
          }
        },
        amountType: 'RECEIVE'
      }
    },
    put: {
      body: {
        expiration: '2016-05-24T08:38:08.699-04:00',
        transferAmount: {
          currency: 'AED',
          amount: '123.45'
        },
        payeeReceiveAmount: {
          currency: 'AED',
          amount: '123.45'
        },
        payeeFspFee: {
          currency: 'AED',
          amount: '123.45'
        },
        ilpPacket,
        condition: ilpCondition
      },
      headers: {
        'fspiop-destination': 'destinationfsp',
        'fspiop-source': 'sourcefsp'
      },
      params: {
        ID: '12345678'
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error'
        }
      }
    }
  },
  transfers: {
    post: {
      body: {
        transferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        payeeFsp: 'payeefsp',
        payerFsp: 'payerfsp',
        amount: {
          currency: 'XXX',
          amount: '123.45'
        },
        ilpPacket,
        condition: ilpCondition,
        expiration: '2016-05-24T08:38:08.699-04:00'
      }
    },
    patch: {
      body: {
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        transferState: 'RESERVED'
      }
    },
    put: {
      body: {
        fulfilment: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        transferState: 'RESERVED'
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error'
        }
      }
    }
  },
  fxQuotes: {
    post: {
      body: {
        conversionTerms: {
          amountType: 'RECEIVE',
          conversionId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          initiatingFsp: 'initfsp',
          counterPartyFsp: 'counterfsp',
          sourceAmount: {
            currency: 'XXX',
            amount: '123.45'
          },
          targetAmount: {
            currency: 'XXY',
            amount: '23.55'
          }
        }
      }
    },
    put: {
      body: {
        condition: 'g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1',
        conversionTerms: {
          amountType: 'RECEIVE',
          conversionId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          initiatingFsp: 'initfsp',
          counterPartyFsp: 'counterfsp',
          sourceAmount: {
            currency: 'XXX',
            amount: '123.45'
          },
          targetAmount: {
            currency: 'XXY',
            amount: '23.55'
          }
        }
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error'
        }
      }
    }
  },
  fxTransfers: {
    post: {
      body: {
        expiration: '2016-05-24T08:38:08.699-04:00',
        commitRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        initiatingFsp: 'initfsp',
        counterPartyFsp: 'counterfsp',
        sourceAmount: {
          currency: 'XXX',
          amount: '123.45'
        },
        targetAmount: {
          currency: 'XXY',
          amount: '234.45'
        },
        condition: { 
          condition: 're58GF7B9AMzwlULedVdVWidOTJGmModEMX6Npe0Pvz'
        }
      }
    },
    patch: {
      body: {
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        conversionState: 'RESERVED'
      }
    },
    put: {
      body: {
        fulfilment: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
        completedTimestamp: '2016-05-24T08:38:08.699-04:00',
        conversionState: 'RESERVED'
      }
    },
    putError: {
      body: {
        errorInformation: {
          errorCode: '3100',
          errorDescription: 'Client Validation Error'
        }
      }
    }
  }
};

export const fspiopIso20022Sources = {
  parties: {
    put: {
      body: {
        Assgnmt: {
          MsgId: '01J96JDSGWE1EJV7JZVG957GNX',
          CreDtTm: '2024-10-02T12:14:07.902Z',
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'source'
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'destination'
                }
              }
            }
          }
        },
        Rpt: {
          OrgnlId: 'subId',
          Vrfctn: true,
          UpdtdPtyAndAcctId: {
            Pty: {
              Id: {
                PrvtId: {
                  Othr: {
                    SchmeNm: {
                      Prtry: 'MSISDN'
                    },
                    Id: '16135551212'
                  }
                }
              },
              Nm: 'party-name'
            },
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'FSPID'
                }
              }
            },
            Acct: {
              Ccy: [
                'AED'
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
            Cd: '3100'
          },
          OrgnlId: 'subId',
          Vrfctn: false
        },
        Assgnmt: {
          MsgId: '01J96K505K7NDQFSBG9P743BF3',
          CreDtTm: '2024-10-02T12:26:48.372Z',
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'source'
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'destination'
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
        CdtTrfTxInf: {
          PmtId: {
            TxId: '12345678',
            EndToEndId: '2345678',
            InstrId: '3456789'
          },
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  SchmeNm: {
                    Cd: 'MSISDN'
                  },
                  Id: '4567890'
                }
              },
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1980-01-01'
                }
              }
            },
            Name: 'Payee Name'
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: '4321'
              }
            }
          },
          CdtrAcct: {
            Ccy: [
              'XTS',
              'XDT'
            ]
          },
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  SchmeNm: {
                    Cd: 'MSISDN'
                  },
                  Id: '987654321'
                }
              },
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: '1970-01-01'
                }
              }
            },
            Name: 'Payer Name',
            Acct: {
              Ccy: [
                'XXX',
                'XXY'
              ]
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'dfsp2'
              }
            }
          },
          ChrgBr: 'DEBT',
          IntrBkSttlmAmt: {
            ChrgsInf: {
              Amt: {
                Ccy: 'USD',
                ActiveOrHistoricCurrencyAndAmount: 5
              }
            },
            Ccy: 'USD',
            ActiveCurrencyAndAmount: '100'
          },
          InstdAmt: {},
          InstrForNxtAgt: {
            InstrInf: 'Test note'
          }
        },
        GrpHdr: {
          PmtInstrXpryDtTm: '2020-01-01T00:00:00Z'
        },
        GroupHeader129: {
          CdtTrfTxInf: {
            Purp: 'DEPOSIT'
          }
        }
      }
    },
    put: {
      body: {
        GrpHdr: {
          MsgId: '01J9KA6PHW6DP9FYSKSP9JZ35S',
          CreDtTm: '2024-10-07T11:00:34.493Z',
          NbOfTxs: '1',
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00',
          PmtId: '12345678',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          }
        },
        CdtTrfTxInf: {
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'destinationfsp'
                }
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'destinationfsp'
              }
            }
          },
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'sourcefsp'
                }
              }
            }
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'sourcefsp'
              }
            }
          },
          ChrgBr: 'CRED',
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          },
          InstdAmt: {
            Ccy: 'AED',
            ActiveOrHistoricCurrencyAndAmount: '123.45'
          },
          ChrgsInf: {
            Amt: {
              Ccy: 'AED',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: ilpPacket
          }
        }
      }
    },
    putError: {
      body: {
        GrpHdr: {
          MsgId: '01J9KA6PHW6DP9FYSKSP9JZ35S',
          CreDtTm: '2024-10-07T11:00:34.493Z'
        },
        TxInfAndSts: {
          StsRsnInf: {
            Rsn: {
              Cd: '3100'
            }
          }
        }
      }
    }
  },
  fxQuotes: {
    post: {
      body: {
        GrpHdr: {
          MsgId: '01J9TYRCYTN8WAKCN3EMAY1BAD',
          CreDtTm: '2024-10-10T10:14:27.034Z',
          NbOfTxs: '1',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          }
        },
        CdtTrfTxInf: {
          PmtId: {
            InstrId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'initfsp'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            Dbtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'initfsp'
                  }
                }
              }
            },
            DbtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'initfsp'
                }
              }
            },
            Cdtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'counterfsp'
                  }
                }
              }
            },
            CdtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'counterfsp'
                }
              }
            },
            InstdAmt: {
              Ccy: 'XXX',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'counterfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXY',
            ActiveCurrencyAndAmount: '23.55'
          },
          ChrgBr: 'DEBT'
        }
      }
    },
    put: {
      body: {
        CdtTrfTxInf: {
          VrfctnOfTerms: {
            IlpV4PrepPacket: {
              condition: 'g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1'
            }
          },
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            InstrId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'initfsp'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            Dbtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'initfsp'
                  }
                }
              }
            },
            DbtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'initfsp'
                }
              }
            },
            Cdtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'counterfsp'
                  }
                }
              }
            },
            CdtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'counterfsp'
                }
              }
            },
            InstdAmt: {
              Ccy: 'XXX',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'counterfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXY',
            ActiveCurrencyAndAmount: '23.55'
          },
          ChrgBr: 'DEBT'
        }
      }
    },
    putError: {
      body: {
        GrpHdr: {
          MsgId: '01J9KA3GYHTDXC63XC8T13TYVR',
          CreDtTm: '2024-10-07T10:58:50.450Z',
        },
        TxInfAndSts: {
          StsRsnInf: {
            Rsn: {
              Cd: '3100'
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
          MsgId: '01J9TXTGDH2BYTYD2DA74X0R9F',
          CreDtTm: '2024-10-10T09:58:07.538Z',
          NbOfTxs: '1',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          },
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          ChrgBr: 'SHAR',
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'payeefsp'
                }
              }
            }
          },
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'payerfsp'
                }
              }
            }
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'payeefsp'
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'payerfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXX',
            ActiveCurrencyAndAmount: '123.45'
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: ilpPacket
          }
        }
      }
    },
    patch: {
      body: {
        GrpHdr: {
          MsgId: '01J9KAQKDJWKWC492855AXHVM3',
          CreDtTm: '2024-10-07T11:09:48.339Z'
        },
        TxInfAndSts: {
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
        }
      }
    },
    put: {
      body: {
        GrpHdr: {
          MsgId: '01J9KAS0HTTEESBVZ0XF0SZ870',
          CreDtTm: '2024-10-07T11:10:34.554Z'
        },
        TxInfAndSts: {
          ExctnConf: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
        }
      }
    },
    putError: {
      body: {
        GrpHdr: {
          MsgId: '01J9KATBS4MGZ35JFV04XY7APA',
          CreDtTm: '2024-10-07T11:11:18.821Z'
        },
        TxInfAndSts: {
          StsRsnInf: {
            Rsn: {
              Cd: '3100'
            }
          }
        }
      }
    }
  },
  fxTransfers: {
    post: {
      body: {
        GrpHdr: {
          MsgId: '01J9TYG0AXZNJXXF5CCH4NDDKK',
          CreDtTm: '2024-10-10T10:09:51.965Z',
          NbOfTxs: '1',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          },
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'initfsp'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            Dbtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'initfsp'
                  }
                }
              }
            },
            DbtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'initfsp'
                }
              }
            },
            Cdtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'counterfsp'
                  }
                }
              }
            },
            CdtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'counterfsp'
                }
              }
            },
            InstdAmt: {
              Ccy: 'XXX',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'counterfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXY',
            ActiveCurrencyAndAmount: '234.45'
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: {
              condition: 're58GF7B9AMzwlULedVdVWidOTJGmModEMX6Npe0Pvz'
            }
          }
        }
      }
    },
    patch: {
      body: {
        GrpHdr: {
          MsgId: '01J9KATBS4MGZ35JFV04XY7APA',
          CreDtTm: '2024-10-07T11:11:18.821Z'
        },
        TxInfAndSts: {
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
        }
      }
    },
    put: {
      body: {
        GrpHdr: {
          MsgId: '01J9KATBS4MGZ35JFV04XY7APA',
          CreDtTm: '2024-10-07T11:11:18.821Z'
        },
        TxInfAndSts: {
          ExctnConf: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
        }
      }
    },
    putError: {
      body: {
        GrpHdr: {
          MsgId: '01J9KATBS4MGZ35JFV04XY7APA',
          CreDtTm: '2024-10-07T11:11:18.821Z'
        },
        TxInfAndSts: {
          StsRsnInf: {
            Rsn: {
              Cd: '3100'
            }
          }
        }
      }
    }
  }
};

export const expectedFspiopIso20022Targets = (target: GenericObject) => ({
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
                  Id: 'source'
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'destination'
                }
              }
            }
          }
        },
        Rpt: {
          Vrfctn: true,
          OrgnlId: 'subId',
          UpdtdPtyAndAcctId: {
            Pty: {
              Id: {
                PrvtId: {
                  Othr: {
                    SchmeNm: {
                      Prtry: 'MSISDN'
                    },
                    Id: '16135551212'
                  }
                }
              },
              Nm: 'party-name'
            },
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'FSPID'
                }
              }
            },
            Acct: {
              Ccy: [
                'AED'
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
            Cd: '3100'
          },
          OrgnlId: 'subId',
          Vrfctn: false
        },
        Assgnmt: {
          MsgId: getProp(target, 'body.Assgnmt.MsgId'),
          CreDtTm: getProp(target, 'body.Assgnmt.CreDtTm'),
          Assgnr: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'source'
                }
              }
            }
          },
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'destination'
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
          NbOfTxs: '1',
          PmtInstrXpryDtTm: '2020-01-01T00:00:00Z',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          },
          CdtTrfTxInf: {
            Purp: {
              Prtry: 'DEPOSIT'
            }
          }
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: '12345678',
            EndToEndId: '2345678'
          },
          Cdtr: {
            Id: {
              PrvtId: {
                Othr: {
                  SchmeNm: {
                    Prtry: 'MSISDN'
                  },
                  Id: '4567890'
                }
              }
            },
            Name: 'Payee Name'
          },
          CdtrAcct: {
            Ccy: [
              'XTS',
              'XDT'
            ]
          },
          Dbtr: {
            Id: {
              PrvtId: {
                Othr: {
                  SchmeNm: {
                    Prtry: 'MSISDN'
                  },
                  Id: '987654321'
                }
              }
            },
            Name: 'Payer Name',
            Acct: {
              Ccy: [
                'XXX',
                'XXY'
              ]
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'dfsp2'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'USD',
            ActiveCurrencyAndAmount: '100'
          },
          ChrgBr: 'CRED'
        }
      }
    },
    put: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: '1',
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          }
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: '12345678'
          },
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'destinationfsp'
                }
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'destinationfsp'
              }
            }
          },
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'sourcefsp'
                }
              }
            }
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'sourcefsp'
              }
            }
          },
          ChrgBr: 'CRED',
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          },
          InstdAmt: {
            Ccy: 'AED',
            ActiveOrHistoricCurrencyAndAmount: '123.45'
          },
          ChrgsInf: {
            Amt: {
              Ccy: 'AED',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: ilpPacket
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
              Cd: '3100'
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
          NbOfTxs: '1',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          },
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          ChrgBr: 'SHAR',
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'payeefsp'
                }
              }
            }
          },
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  Id: 'payerfsp'
                }
              }
            }
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'payeefsp'
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'payerfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXX',
            ActiveCurrencyAndAmount: '123.45'
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: ilpPacket
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
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
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
          ExctnConf: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
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
              Cd: '3100'
            }
          }
        }
      }
    }
  },
  fxQuotes: {
    post: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: '1',
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          }
        },
        CdtTrfTxInf: {
          PmtId: {
            InstrId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'initfsp'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            Dbtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'initfsp'
                  }
                }
              }
            },
            DbtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'initfsp'
                }
              }
            },
            Cdtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'counterfsp'
                  }
                }
              }
            },
            CdtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'counterfsp'
                }
              }
            },
            InstdAmt: {
              Ccy: 'XXX',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'counterfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXY',
            ActiveCurrencyAndAmount: '23.55'
          },
          ChrgBr: 'DEBT'
        }
      }
    },
    put: {
      body: {
        CdtTrfTxInf: {
          VrfctnOfTerms: {
            IlpV4PrepPacket: {
              condition: 'g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1'
            }
          },
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            InstrId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'initfsp'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            Dbtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'initfsp'
                  }
                }
              }
            },
            DbtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'initfsp'
                }
              }
            },
            Cdtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'counterfsp'
                  }
                }
              }
            },
            CdtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'counterfsp'
                }
              }
            },
            InstdAmt: {
              Ccy: 'XXX',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'counterfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXY',
            ActiveCurrencyAndAmount: '23.55'
          },
          ChrgBr: 'DEBT'
        },
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: '1',
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00',
          SttlmInf: {
            SttlmMtd: 'CLRG'
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
              Cd: '3100'
            }
          }
        }
      }
    }
  },
  fxTransfers: {
    post: {
      body: {
        GrpHdr: {
          MsgId: getProp(target, 'body.GrpHdr.MsgId'),
          CreDtTm: getProp(target, 'body.GrpHdr.CreDtTm'),
          NbOfTxs: '1',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          },
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'initfsp'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            Dbtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'initfsp'
                  }
                }
              }
            },
            DbtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'initfsp'
                }
              }
            },
            Cdtr: {
              Id: {
                OrgId: {
                  Othr: {
                    Id: 'counterfsp'
                  }
                }
              }
            },
            CdtrAgt: {
              FinInstnId: {
                Othr: {
                  Id: 'counterfsp'
                }
              }
            },
            InstdAmt: {
              Ccy: 'XXX',
              ActiveOrHistoricCurrencyAndAmount: '123.45'
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'counterfsp'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'XXY',
            ActiveCurrencyAndAmount: '234.45'
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: 're58GF7B9AMzwlULedVdVWidOTJGmModEMX6Npe0Pvz'
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
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
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
          ExctnConf: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESV'
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
              Cd: '3100'
            }
          }
        }
      }
    }
  }
});
