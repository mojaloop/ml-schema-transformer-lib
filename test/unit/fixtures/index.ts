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
      currencyConversion: {
        sourceAmount: {
          currency: "USD",
          amount: "100"
        },
        targetAmount: {
          currency: "USD",
          amount: "100"
        }
      },
      note: "Test note"
    }
  }
}

export const fspiop_iso20022 = {
  quotes: {
    post: {
      
    }
  }
}

