// FSPIOP ISO20022 to FSPIOP mappings

export const quotes = {
  post: `{
    quoteId: 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.TxId',
    transactionId: 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.EndToEndId',
    transactionRequestId: 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.InstrId',
    'payee.partyIdInfo.partyIdType': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd',
    'payee.partyIdInfo.partyIdentifier': 'TermsRequest_FIToFICustomerCreditProposals.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id',
    'payee.merchantClassificationCode': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id',
    'payee.name': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Name',
    'payee.partyIdInfo.dateOfBirth': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt',
    'payee.supportedCurrencies': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAcct.Ccy',
    'payer.partyIdInfo.partyIdType': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Cd',
    'payer.partyIdInfo.partyIdentifier': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id',
    'payer.partyIdInfo.fspId': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id',
    'payer.name': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Name',
    'payer.partyIdInfo.dateOfBirth': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt',
    'payer.supportedCurrencies': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Acct.Ccy',
    amountType: 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.ChrgBr',
    'fees.currency': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy',
    'fees.amount': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount',
    'currencyConversion.sourceAmount.currency': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy',
    'currencyConversion.sourceAmount.amount': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount',
    'amount.currency': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy',
    'amount.amount': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount',
    note: 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstrForNxtAgt.InstrInf',
    expiration: 'TermsRequest_FIToFICustomerCreditProposal.GrpHdr.PmtInstrXpryDtTm',
    'transactionType.scenario': 'TermsRequest_FIToFICustomerCreditProposal.GroupHeader129.CdtTrfTxInf.Purp'
  }`,
  put: `{
    'transferAmount.currency': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy',
    'transferAmount.amount': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount',
    'payeeReceiveAmount.currency': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy',
    'payeeReceiveAmount.amount': 'TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount',
    'payeeFspCommission.currency': 'TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy',
    'payeeFspCommission.amount': 'TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount',
    expiration: 'TermsResponse_FIToFICustomerCreditConfirmation.GrpHdr.PmtInstrXpryDtTm',
    ilpPacket: 'TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket',
    condition: 'TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket.condition'
  }`,
  putError: `{
    'errorInformation.errorCode': 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts',
    'errorInformation.errorDescription': 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf'
  }`
}
