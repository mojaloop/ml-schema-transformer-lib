// FSPIOP to FSPIOP ISO2022 mappings

export const transfers = {
  post: `{
    "Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.PmtId.EndToEndId": "transferId",
    "Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id": "payeeFsp",
    "Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id": "payerFsp",
    "Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "amount.currency",
    "Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount": "amount.amount",
    "Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket": "ilpPacket",
    "Execute_FIToFICustomerCreditTransferV13.GrpHdr.PmtInstrXpryDtTm": "expiration"
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
