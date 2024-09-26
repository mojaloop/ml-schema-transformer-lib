// FSPIOP ISO220022 to FSPIOP mappings

export const transfers = {
  post: `{
    transferId: 'Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.PmtId.EndToEndId',
    payeeFsp: 'Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id',
    payerFsp: 'Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id',
    'amount.currency': 'Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.IntrBkSttlmAmt.Ccy',
    'amount.amount': 'Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount',
    ilpPacket: 'Execute_FIToFICustomerCreditTransferV13.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket',
    expiration: 'Execute_FIToFICustomerCreditTransferV13.GrpHdr.PmtInstrXpryDtTm'
    }`,
  patch: `
    completedTimestamp: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm',
    transferState: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts'
  `,
  put: `{
    fulfilment: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.ExctnConf',
    completedTimestamp: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm',
    transferState: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts'
  }`,
  putError: `{
    'errorInformation.errorCode': 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts',
    'errorInformation.errorDescription': 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf'
  }`
}