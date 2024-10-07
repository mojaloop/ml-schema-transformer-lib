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
 should be listed with a "*" in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a "-". Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>
 
 * Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

// FSPIOP ISO20022 to FSPIOP mappings

export const fxQuotes = {
  post: `{
    "body.conversionRequestId": "body.CdtTrfTxInf.PmtId.EndToEndId",
    "body.conversionTerms.conversionId": "body.CdtTrfTxInf.PmtId.InstrId",
    "body.conversionTerms.determiningTransferId": "body.CdtTrfTxInf.PmtId.TxId",
    "body.conversionTerms.initiatingFsp": "body.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id",
    "body.conversionTerms.counterPartyFsp": "body.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id",
    "body.conversionTerms.amountType": "body.CdtTrfTxInf.ChrgBr",
    "body.conversionTerms.sourceAmount.currency": "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy",
    "body.conversionTerms.sourceAmount.amount": "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "body.conversionTerms.targetAmount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "body.conversionTerms.targetAmount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "body.conversionTerms.expiration": "body.GrpHdr.PmtInstrXpryDtTm"
  }`,
  put: `{
    "body.condition": "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
    "body.conversionTerms.conversionId": "body.CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId",
    "body.conversionTerms.determiningTransferId": "body.CdtTrfTxInf.PmtId.TxId",
    "body.conversionTerms.initiatingFsp": "body.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id",
    "body.conversionTerms.counterPartyFsp": "body.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id",
    "body.conversionTerms.amountType": "body.CdtTrfTxInf.ChrgBr",
    "body.conversionTerms.sourceAmount.currency": "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy",
    "body.conversionTerms.sourceAmount.amount": "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "body.conversionTerms.targetAmount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "body.conversionTerms.targetAmount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType",
    "body.conversionTerms.expiration": "body.GrpHdr.PmtInstrXpryDtTm"
  }`,
  putError: `{
    "body.errorInformation.errorCode": "body.TxInfAndSts.TxSts",
    "body.errorInformation.errorDescription": "body.TxInfAndSts.StsRsnInf.AddtInf"
  }`
}

// FSPIOP to FSPIOP ISO20022 mappings

export const fxQuotes_reverse = {
  post: `{
    "body.CdtTrfTxInf.PmtId.EndToEndId": "body.conversionRequestId",
    "body.CdtTrfTxInf.PmtId.InstrId": "body.conversionTerms.conversionId",
    "body.CdtTrfTxInf.PmtId.TxId": "body.conversionTerms.determiningTransferId",
    "body.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id": "body.conversionTerms.initiatingFsp",
    "body.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id": "body.conversionTerms.counterPartyFsp",
    "body.CdtTrfTxInf.ChrgBr": "body.conversionTerms.amountType",
    "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy": "body.conversionTerms.sourceAmount.currency",
    "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "body.conversionTerms.sourceAmount.amount",
    "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "body.conversionTerms.targetAmount.currency",
    "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "body.conversionTerms.targetAmount.amount",
    "body.GrpHdr.PmtInstrXpryDtTm": "body.conversionTerms.expiration"
  }`,
  put: `{
    "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket": "body.condition",
    "body.CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId": "body.conversionTerms.conversionId",
    "body.CdtTrfTxInf.PmtId.TxId": "body.conversionTerms.determiningTransferId",
    "body.CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id": "body.conversionTerms.initiatingFsp",
    "body.CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id": "body.conversionTerms.counterPartyFsp",
    "body.CdtTrfTxInf.ChrgBr": "body.conversionTerms.amountType",
    "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy": "body.conversionTerms.sourceAmount.currency",
    "body.CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "body.conversionTerms.sourceAmount.amount",
    "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "body.conversionTerms.targetAmount.currency",
    "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveOrHistoricCurrencyAndAmount_SimpleType": "body.conversionTerms.targetAmount.amount",
    "body.GrpHdr.PmtInstrXpryDtTm": "body.conversionTerms.expiration"
  }`,
  putError: `{
    "body.TxInfAndSts.TxSts": "body.errorInformation.errorCode",
    "body.TxInfAndSts.StsRsnInf.AddtInf": "body.errorInformation.errorDescription"
  }`
}
