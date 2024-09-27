/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>
 
 * Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

// FSPIOP ISO2022 to FSPIOP mappings

export const fxTransfers = {
  post: `{
    commitRequestId: "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.PmtId.EndToEndId",
    determiningTransferId: "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.PmtId.TxId",
    initiatingFsp: "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id",
    counterPartyFsp: "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id",
    "sourceAmount.currency": "Fxecute_FinancialInstitutionCreditTransferV12..CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy",
    "sourceAmount.amount": "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "targetAmount.currency": "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "targetAmount.amount": "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    condition: "Fxecute_FinancialInstitutionCreditTransferV12.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
    expiration: "Fxecute_FinancialInstitutionCreditTransferV12.GrpHdr.PmtInstrXpryDtTm"
  }`,
  patch: `{
    completedTimestamp: "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm",
    transferState: "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts"
  }`,
  put: `{
    fulfilment: "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.ExctnConf",
    completedTimestamp: "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.PrcgDt.DtTm",
    transferState: "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts"
  }`,
  putError: `{
    "errorInformation.errorCode": "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts",
    "errorInformation.errorDescription": "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf"
  }`
}
