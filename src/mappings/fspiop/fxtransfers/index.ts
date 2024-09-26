// FSPIOP to FSPIOP ISO2022 mappings

export const transfers = {
  post: `{
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.PmtId.EndToEndId": "commitRequestId",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.PmtId.TxId": "determiningTransferId",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id": "initiatingFsp",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id": "counterPartyFsp",
    "Fxecute_FinancialInstitutionCreditTransferV12..CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy": "sourceAmount.currency",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "sourceAmount.amount",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "targetAmount.currency",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "targetAmount.amount",
    "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket": "condition",
    "Fxecute_FinancialInstitutionCreditTransferV12.GrpHdr.PmtInstrXpryDtTm": "expiration"
  }`,
  patch: `{
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm": "completedTimestamp",
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts": "transferState"
  }`,
  put: `{
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.ExctnConf": "fulfilment",
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm": "completedTimestamp",
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts": "transferState"
  }`,
  putError: `{
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts": "errorInformation.errorCode",
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf": "errorInformation.errorDescription"
  }`
}