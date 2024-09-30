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

// FSPIOP to FSPIOP ISO20022 mappings

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
