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
};

export const fspiop = {
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
        payeeFspCommission: {
          currency: 'AED',
          amount: '123.45'
        },
        expiration: '2016-05-24T08:38:08.699-04:00',
        geoCode: {
          latitude: '+45.4215',
          longitude: '+75.6972'
        },
        ilpPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA',
        condition: '_Bn2Rc51-Zo5kPnZkmqr0Oecxk3Ig1pYgeK4SdV49zh',
        extensionList: {
          extension: [
            {
              key: 'string',
              value: 'string'
            }
          ]
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
          initiatingFsp: 'string',
          counterPartyFsp: 'string',
          amountType: 'RECEIVE',
          sourceAmount: {
            currency: 'AED',
            amount: '123.45'
          },
          targetAmount: {
            currency: 'AED',
            amount: '123.45'
          },
          expiration: '2016-05-24T08:38:08.699-04:00',
          charges: [
            {
              chargeType: 'string',
              sourceAmount: {
                currency: 'AED',
                amount: '123.45'
              },
              targetAmount: {
                currency: 'AED',
                amount: '123.45'
              }
            }
          ],
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
    },
    put: {
      body: {
        condition: 'g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1',
        conversionTerms: {
          conversionId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
          initiatingFsp: 'string',
          counterPartyFsp: 'string',
          amountType: 'RECEIVE',
          sourceAmount: {
            currency: 'AED',
            amount: '123.45'
          },
          targetAmount: {
            currency: 'AED',
            amount: '123.45'
          },
          expiration: '2016-05-24T08:38:08.699-04:00',
          charges: [
            {
              chargeType: 'string',
              sourceAmount: {
                currency: 'AED',
                amount: '123.45'
              },
              targetAmount: {
                currency: 'AED',
                amount: '123.45'
              }
            }
          ],
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
  transfers: {
    post: {
      body: {
        transferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        payeeFsp: 'string',
        payerFsp: 'string',
        amount: {
          currency: 'AED',
          amount: '123.45'
        },
        ilpPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA',
        condition: 'TYBsJ3FzHWSHwbtrCTjCKADWoeYJLRNvAzzuRd13lJM',
        expiration: '2016-05-24T08:38:08.699-04:00',
        extensionList: {
          extension: [
            {
              key: 'string',
              value: 'string'
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
              key: 'string',
              value: 'string'
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
              key: 'string',
              value: 'string'
            }
          ]
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
  fxTransfers: {
    post: {
      body: {
        commitRequestId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        determiningTransferId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
        initiatingFsp: 'string',
        counterPartyFsp: 'string',
        sourceAmount: {
          currency: 'AED',
          amount: '123.45'
        },
        targetAmount: {
          currency: 'AED',
          amount: '123.45'
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
              key: 'string',
              value: 'string'
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
              key: 'string',
              value: 'string'
            }
          ]
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
  }
};

export const fspiopIso20022 = {
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
                PrvId: {
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
          ChrgBr: 'SEND',
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
          MsgId: '01J9KA3GYHTDXC63XC8T13TYVR',
          CreDtTm: '2024-10-07T10:58:50.450Z',
          NbOfTxs: 1,
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00',
          SttlmInf: {
            SttlmMtd: 'CLRG'
          }
        },
        CdtTrfTxInf: {
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          },
          InstdAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          },
          ChrgsInf: {
            Amt: {
              Ccy: 'AED'
            }
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA'
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
        CdtTrfTxInf: {
          PmtId: {
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            InstrId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          ChrgBr: 'RECEIVE',
          UndrlygCstmrCdtTrf: {
            InstdAmt: {
              Ccy: 'AED',
              ActiveOrHistoricCurrencyAndAmount_SimpleType: '123.45'
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveOrHistoricCurrencyAndAmount_SimpleType: '123.45'
          }
        },
        GrpHdr: {
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        }
      }
    },
    put: {
      body: {
        CdtTrfTxInf: {
          VrfctnOfTerms: {
            IlpV4PrepPacket: 'g55PVnhRS9OAKnMS6AkNBtPngJbMaRixwVKM3BPGYH1',
            PmtId: {
              InstrId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
            }
          },
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          ChrgBr: 'RECEIVE',
          UndrlygCstmrCdtTrf: {
            InstdAmt: {
              Ccy: 'AED',
              ActiveOrHistoricCurrencyAndAmount_SimpleType: '123.45'
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveOrHistoricCurrencyAndAmount_SimpleType: '123.45'
          }
        },
        GrpHdr: {
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        }
      }
    },
    putError: {
      body: {
        TxInfAndSts: {
          TxSts: '3100',
          StsRsnInf: {
            AddtInf: 'string'
          }
        }
      }
    }
  },
  transfers: {
    post: {
      body: {
        GrpHdr: {
          MsgId: '01J9KAN53RBRYEE3THRVPMS0BQ',
          CreDtTm: '2024-10-07T11:08:28.154Z',
          NbOfTxs: 1,
          SttlmInf: {
            SttlmMtd: 'CLRG'
          },
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        },
        CdtTrfTxInf: {
          PmtId: {
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          DbtrAgt: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: 'AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA'
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
          TxSts: 'RESERVED'
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
          TxSts: 'RESERVED'
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
        CdtTrfTxInf: {
          PmtId: {
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069',
            TxId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
          },
          Dbtr: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          Cdtr: {
            FinInstnId: {
              Othr: {
                Id: 'string'
              }
            }
          },
          UndrlygCstmrCdtTrf: {
            InstdAmt: {
              Ccy: 'AED',
              ActiveOrHistoricCurrencyAndAmount_SimpleType: '123.45'
            }
          },
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveOrHistoricCurrencyAndAmount_SimpleType: '123.45'
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: 're58GF7B9AMzwlULedVdVWidOTJGmModEMX6Npe0Pvz'
          }
        },
        GrpHdr: {
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        }
      }
    },
    patch: {
      body: {
        TxInfAndSts: {
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          }
        }
      }
    },
    put: {
      body: {
        TxInfAndSts: {
          ExctnConf: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          }
        }
      }
    },
    putError: {
      body: {
        TxInfAndSts: {
          TxSts: '3100',
          StsRsnInf: {
            AddtInf: 'string'
          }
        }
      }
    }
  }
};

