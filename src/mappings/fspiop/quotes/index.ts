// FSPIOP to FSPIOP ISO2022 mapping

export const quotes = {
  post: `{
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.TxId": "quoteId",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.EndToEndId": "transactionId",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.InstrId": "transactionRequestId",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd": "payee.partyIdInfo.partyIdType",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id": "payee.partyIdInfo.partyIdentifier",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id": "payee.merchantClassificationCode",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Name": "payee.name",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt": "payee.partyIdInfo.dateOfBirth",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAcct.Ccy": "payee.supportedCurrencies",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Cd": "payer.partyIdInfo.partyIdType",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id": "payer.partyIdInfo.partyIdentifier",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id": "payer.partyIdInfo.fspId",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Name": "payer.name",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt": "payer.partyIdInfo.dateOfBirth",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Acct.Ccy": "payer.supportedCurrencies",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.ChrgBr": "amountType",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy": "fees.currency",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount": "fees.amount",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy": "currencyConversion.sourceAmount.currency",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount": "currencyConversion.sourceAmount.amount",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "{ $alt: [ 'amount.currency', { $value: 'currencyConversion.targetAmount.currency' } }",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount": "{ $alt: [ 'amount.amount', { $value: 'currencyConversion.targetAmount.amount' } }",
      "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstrForNxtAgt.InstrInf": "note",
      "TermsRequest_FIToFICustomerCreditProposal.GrpHdr.PmtInstrXpryDtTm": "expiration",
      "TermsRequest_FIToFICustomerCreditProposal.GroupHeader129.CdtTrfTxInf.Purp": "transactionType.scenario"
    }`,
  putById: ``,
  putErrorById: ``
}

