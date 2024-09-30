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
      party: {
        partyIdInfo: {
          partyIdType: 'MSISDN',
          partyIdentifier: '16135551212',
          partySubIdOrType: 'string',
          fspId: 'string',
          extensionList: {
            extension: [
              {
                key: 'string',
                value: 'string'
              }
            ]
          }
        },
        merchantClassificationCode: '8',
        name: 'string',
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
    putError: {
      errorInformation: {
        errorCode: '5100',
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
  },
  quotes: {
    post: {
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
    },
    put: {
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
    },
    putError: {
      errorInformation: {
        errorCode: '5100',
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
  },
  fxQuotes: {
    post: {
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
    },
    put: {
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
    },
    putError: {
      errorInformation: {
        errorCode: '5100',
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
  },
  transfers: {
    post: {
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
    },
    patch: {
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
    },
    put: {
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
    },
    putError: {
      errorInformation: {
        errorCode: '5100',
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
  },
  fxTransfers: {
    post: {
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
    },
    patch: {
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
    },
    put: {
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
    },
    putError: {
      errorInformation: {
        errorCode: '5100',
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
};

export const fspiopIso20022 = {
  parties: {
    put: {
      GetParties_IdentificationVerificationReportV03: {
        Rpt: {
          UpdtdPtyAndAcctId: {
            Pty: {
              Id: {
                OrgId: {
                  Othr: {
                    SchmeNm: {
                      Prtry: 'MSISDN'
                    },
                    Id: '16135551212'
                  }
                },
                PrvtId: {
                  DtAndPlcOfBirth: {}
                }
              },
              Nm: 'string'
            },
            CashAccount40: {
              Ccy: [
                'AED'
              ]
            }
          }
        },
        Assgnmt: {
          Assgne: {
            Agt: {
              FinInstnId: {
                Othr: {
                  Id: 'string'
                }
              }
            }
          }
        }
      }
    },
    putError: {
      GetPartiesError_IdentificationVerificationReportV03: {
        Rpt: {
          Rsn: {
            Cd: '5100'
          }
        }
      }
    }
  },
  quotes: {
    post: {
      TermsRequest_FIToFICustomerCreditProposal: {
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
      TermsRequest_FIToFICustomerCreditProposal: {
        CdtTrfTxInf: {
          InstdAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          },
          IntrBkSttlmAmt: {
            Ccy: 'AED',
            ActiveCurrencyAndAmount: '123.45'
          }
        }
      },
      TermsResponse_FIToFICustomerCreditConfirmation: {
        CdtTrfTxInf: {
          IntrBkSttlmAmt: {
            ChrgsInf: {
              Amt: {
                Ccy: 'AED',
                ActiveOrHistoricCurrencyAndAmount: '123.45'
              }
            }
          },
          VrfctnOfTerms: {
            IlpV4PrepPacket: {
              condition: '_Bn2Rc51-Zo5kPnZkmqr0Oecxk3Ig1pYgeK4SdV49zh'
            }
          }
        },
        GrpHdr: {
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        }
      }
    },
    putError: {
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          TxSts: '5100',
          StsRsnInf: {
            AddtInf: 'string'
          }
        }
      }
    }
  },
  fxQuotes: {
    post: {
      FxRequest_FICreditTransferProposal: {
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
      FxResponse_FICreditTransferProposal: {
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
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          TxSts: '5100',
          StsRsnInf: {
            AddtInf: 'string'
          }
        }
      }
    }
  },
  transfers: {
    post: {
      Execute_FIToFICustomerCreditTransferV13: {
        CdtTrfTxInf: {
          PmtId: {
            EndToEndId: 'b51ec534-ee48-4575-b6a9-ead2955b8069'
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
        },
        GrpHdr: {
          PmtInstrXpryDtTm: '2016-05-24T08:38:08.699-04:00'
        }
      }
    },
    patch: {
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          },
          TxSts: 'RESERVED'
        }
      }
    },
    put: {
      PacsStatus_FIToFIPaymentStatusReportV15: {
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
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          TxSts: '5100',
          StsRsnInf: {
            AddtInf: 'string'
          }
        }
      }
    }
  },
  fxTransfers: {
    post: {
      Fxecute_FinancialInstitutionCreditTransferV12: {
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
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          }
        }
      }
    },
    put: {
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          ExctnConf: 'WLctttbu2HvTsa1XWvUoGRcQozHsqeu9Ahl2JW9Bsu8',
          PrcgDt: {
            DtTm: '2016-05-24T08:38:08.699-04:00'
          }
        }
      }
    },
    putError: {
      PacsStatus_FIToFIPaymentStatusReportV15: {
        TxInfAndSts: {
          TxSts: '5100',
          StsRsnInf: {
            AddtInf: 'string'
          }
        }
      }
    }
  }
};

