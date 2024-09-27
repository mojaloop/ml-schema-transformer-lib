// FSPIOP ISO2022 to FSPIOP mappings

export const fxQuotes = {
  post: `{
    conversionRequestId: 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.EndToEndId',
    'conversionTerms.conversionId': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.InstrId',
    'conversionTerms.determiningTransferId': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.TxId',
    'conversionTerms.initiatingFsp': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id',
    'conversionTerms.counterPartyFsp': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id',
    'conversionTerms.amountType': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.ChrgBr',
    'conversionTerms.sourceAmount.currency': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy',
    'conversionTerms.sourceAmount.amount': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType',
    'conversionTerms.targetAmount.currency': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy',
    'conversionTerms.targetAmount.amount': 'FxRequest_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType',
    'conversionTerms.expiration': 'FxRequest_FICreditTransferProposal.GrpHdr.PmtInstrXpryDtTm'
  }`,
  put: `{
    condition: 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket',
    'conversionTerms.conversionId': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId',
    'conversionTerms.determiningTransferId': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.PmtId.TxId',
    'conversionTerms.initiatingFsp': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id',
    'conversionTerms.counterPartyFsp': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id',
    'conversionTerms.amountType': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.ChrgBr',
    'conversionTerms.sourceAmount.currency': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy',
    'conversionTerms.sourceAmount.amount': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType',
    'conversionTerms.targetAmount.currency': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy',
    'conversionTerms.targetAmount.amount': 'FxResponse_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType',
    'conversionTerms.expiration': 'FxResponse_FICreditTransferProposal.GrpHdr.PmtInstrXpryDtTm'
  }`,
  putError: `{
    'errorInformation.errorCode': 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts',
    'errorInformation.errorDescription': 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf'
  }`
}
