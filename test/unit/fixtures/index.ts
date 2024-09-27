export const fspiop = {
  quotes: {
    post: {
      quoteId: "12345678",
      transactionId: "2345678",
      transactionRequestId: "3456789",
      payee: {
        name: "Payee Name",
        merchantClassificationCode: "4321",
        partyIdInfo: {
          partyIdType: "MSISDN",
          partyIdentifier: "4567890",
          dateOfBirth: "1980-01-01"
        },
        supportedCurrencies: ["XTS", "XDT"]
      },
      payer: {
        name: "Payer Name",
        partyIdInfo: {
          partyIdType: "MSISDN",
          partyIdentifier: "987654321",
          fspId: "dfsp2",
          dateOfBirth: "1970-01-01"
        },
        supportedCurrencies: ["XXX", "XXY"]
      },
      amountType: "SEND",
      amount: {
        currency: "USD",
        amount: "100"
      },
      fees: {
        currency: "USD",
        amount: 5
      },
      transactionType: {
        scenario: "DEPOSIT"
      },
      expiration: "2020-01-01T00:00:00Z",
      note: "Test note"
    }
  }
}

export const fspiop_iso20022 = {
  quotes: {
    post: {
      TermsRequest_FIToFICustomerCreditProposal: {
        CdtTrfTxInf: {
          PmtId: {
            TxId: "12345678",
            EndToEndId: "2345678",
            InstrId: "3456789"
          },
          Cdtr: {
            Id: {
              OrgId: {
                Othr: {
                  SchmeNm: {
                    Cd: "MSISDN"
                  },
                  Id: "4567890"
                }
              },
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: "1980-01-01"
                }
              }
            },
            Name: "Payee Name"
          },
          CdtrAgt: {
            FinInstnId: {
              Othr: {
                Id: "4321"
              }
            }
          },
          CdtrAcct: {
            Ccy: [
              "XTS",
              "XDT"
            ]
          },
          Dbtr: {
            Id: {
              OrgId: {
                Othr: {
                  SchmeNm: {
                    Cd: "MSISDN"
                  },
                  Id: "987654321"
                }
              },
              PrvtId: {
                DtAndPlcOfBirth: {
                  BirthDt: "1970-01-01"
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
          ChrgBr: "SEND",
          IntrBkSttlmAmt: {
            ChrgsInf: {
              Amt: {
                Ccy: "USD",
                ActiveOrHistoricCurrencyAndAmount: 5
              }
            }
          },
          InstdAmt: {},
          InstrForNxtAgt: {
            InstrInf: "Test note"
          }
        },
        GrpHdr: {
          PmtInstrXpryDtTm: "2020-01-01T00:00:00Z"
        },
        GroupHeader129: {
          CdtTrfTxInf: {
            Purp: "DEPOSIT"
          }
        }
      }
    }
  }
}

