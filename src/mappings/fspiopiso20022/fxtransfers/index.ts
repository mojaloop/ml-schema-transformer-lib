// FSPIOP ISO2022 to FSPIOP mappings

export const transfers = {
  post: `{
    commitRequestId: 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.PmtId.EndToEndId',
    determiningTransferId: 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.PmtId.TxId',
    initiatingFsp: 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id',
    counterPartyFsp: 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id',
    'sourceAmount.currency': 'Fxecute_FinancialInstitutionCreditTransferV12..CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy',
    'sourceAmount.amount': 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType',
    'targetAmount.currency': 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.IntrBkSttlmAmt.Ccy',
    'targetAmount.amount': 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType',
    condition: 'Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket',
    expiration: 'Fxecute_FinancialInstitutionCreditTransferV12.GrpHdr.PmtInstrXpryDtTm'
  }`,
  patch: `{
    completedTimestamp: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm',
    transferState: 'PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts'
  }`,
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
