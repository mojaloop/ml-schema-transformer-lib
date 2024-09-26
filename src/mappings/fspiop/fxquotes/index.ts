// FSPIOP to FSPIOP ISO2022 mappings

export const fxQuotes = {
  post: `{
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.EndToEndId": "conversionRequestId",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.InstrId": "conversionTerms.conversionId",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.TxId": "conversionTerms.determiningTransferId",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id": "conversionTerms.initiatingFsp",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id": "conversionTerms.counterPartyFsp",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.ChrgBr": "conversionTerms.amountType",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy": "conversionTerms.sourceAmount.currency",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "conversionTerms.sourceAmount.amount",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "conversionTerms.targetAmount.currency",
    "FxRequest_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "conversionTerms.targetAmount.amount",
    "FxRequest_FICreditTransferProposal.GrpHdr.PmtInstrXpryDtTm": "conversionTerms.expiration"
  }`,
  put: `{
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket": "condition",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId": "conversionTerms.conversionId",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.PmtId.TxId": "conversionTerms.determiningTransferId",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id": "conversionTerms.initiatingFsp",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id": "conversionTerms.counterPartyFsp",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.ChrgBr": "conversionTerms.amountType",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy": "conversionTerms.sourceAmount.currency",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "conversionTerms.sourceAmount.amount",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "conversionTerms.targetAmount.currency",
    "FxResponse_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "conversionTerms.targetAmount.amount",
    "FxResponse_FICreditTransferProposal.GrpHdr.PmtInstrXpryDtTm": "conversionTerms.expiration"
  }`,
  putError: `{
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts": "errorInformation.errorCode",
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf": "errorInformation.errorDescription"
  }`
}