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

// FSPIOP ISO20022 to FSPIOP mappings

export const fxTransfers = {
  post: `{
    "body.commitRequestId": "body.CdtTrfTxInf.PmtId.EndToEndId",
    "body.determiningTransferId": "body.CdtTrfTxInf.PmtId.TxId",
    "body.initiatingFsp": "body.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id",
    "body.counterPartyFsp": "body.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id",
    "body.sourceAmount.currency": "body..CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy",
    "body.sourceAmount.amount": "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "body.targetAmount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "body.targetAmount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "body.condition": "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
    "body.expiration": "body.GrpHdr.PmtInstrXpryDtTm"
  }`,
  patch: `{
    "body.completedTimestamp": "body.TxInfAndSts.PrcgDt.DtTm",
    "body.transferState": "body.TxInfAndSts.TxSts"
  }`,
  put: `{
    "body.fulfilment": "body.TxInfAndSts.ExctnConf",
    "body.completedTimestamp": "body.TxInfAndSts.PrcgDt.DtTm",
    "body.transferState": "body.TxInfAndSts.TxSts"
  }`,
  putError: `{
    "body.errorInformation.errorCode": "body.TxInfAndSts.TxSts",
    "body.errorInformation.errorDescription": "body.TxInfAndSts.StsRsnInf.AddtInf"
  }`
}
