import mapTransform from 'map-transform'

export const fspiop = {
  quotes: {
    post: {
      quoteId: "12345678",
      transactionId: "12345678",
      transactionRequestId: "12345678",
      payee: {
        partyIdInfo: {
          partyIdType: "MSISDN",
          partyIdentifier: "123456789",
          fspId: "dfsp1"
        }
      },
      payer: {
        partyIdInfo: {
          partyIdType: "MSISDN",
          partyIdentifier: "987654321",
          fspId: "dfsp2"
        }
      },
      amountType: "SEND",
      amount: {
        currency: "USD",
        amount: "100"
      },
      transactionType: {
        scenario: "DEPOSIT",
        initiator: "PAYER",
        initiatorType: "CONSUMER"
      },
      expiration: "2020-01-01T00:00:00Z",
      extensionList: {
        extension: [
          {
            key: "key1",
            value: "value1"
          }
        ]
      }
    }
  }
}

export const fspiop_iso20022 = {
  quotes: {
    post: {
      
    }
  }
}

