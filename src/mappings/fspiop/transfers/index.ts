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
