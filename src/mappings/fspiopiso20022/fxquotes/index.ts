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

export const fxQuotes = {
  post: `{
    "conversionRequestId": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.EndToEndId",
    "conversionTerms.conversionId": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.InstrId",
    "conversionTerms.determiningTransferId": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.PmtId.TxId",
    "conversionTerms.initiatingFsp": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id",
    "conversionTerms.counterPartyFsp": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id",
    "conversionTerms.amountType": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.ChrgBr",
    "conversionTerms.sourceAmount.currency": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy",
    "conversionTerms.sourceAmount.amount": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "conversionTerms.targetAmount.currency": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "conversionTerms.targetAmount.amount": "FxRequest_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "conversionTerms.expiration": "FxRequest_FICreditTransferProposal.GrpHdr.PmtInstrXpryDtTm"
  }`,
  put: `{
    "condition": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
    "conversionTerms.conversionId": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId",
    "conversionTerms.determiningTransferId": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.PmtId.TxId",
    "conversionTerms.initiatingFsp": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id",
    "conversionTerms.counterPartyFsp": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id",
    "conversionTerms.amountType": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.ChrgBr",
    "conversionTerms.sourceAmount.currency": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy",
    "conversionTerms.sourceAmount.amount": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "conversionTerms.targetAmount.currency": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "conversionTerms.targetAmount.amount": "FxResponse_FICreditTransferProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "conversionTerms.expiration": "FxResponse_FICreditTransferProposal.GrpHdr.PmtInstrXpryDtTm"
  }`,
  putError: `{
    "errorInformation.errorCode": "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts",
    "errorInformation.errorDescription": "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf"
  }`
}
