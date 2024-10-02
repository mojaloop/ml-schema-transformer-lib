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

// FSPIOP ISO 20022 to FSPIOP mappings

export const quotes = {
  post: `{
    "body.quoteId": "body.CdtTrfTxInf.PmtId.TxId",
    "body.transactionId": "body.CdtTrfTxInf.PmtId.EndToEndId",
    "body.transactionRequestId": "body.CdtTrfTxInf.PmtId.InstrId",
    "body.payee.partyIdInfo.partyIdType": "body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd",
    "body.payee.partyIdInfo.partyIdentifier": "body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id",
    "body.payee.merchantClassificationCode": "body.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id",
    "body.payee.name": "body.CdtTrfTxInf.Cdtr.Name",
    "body.payee.partyIdInfo.dateOfBirth": "body.CdtTrfTxInf.Cdtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt",
    "body.payee.supportedCurrencies": "body.CdtTrfTxInf.CdtrAcct.Ccy",
    "body.payer.partyIdInfo.partyIdType": "body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Cd",
    "body.payer.partyIdInfo.partyIdentifier": "body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id",
    "body.payer.partyIdInfo.fspId": "body.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id",
    "body.payer.name": "body.CdtTrfTxInf.Dbtr.Name",
    "body.payer.partyIdInfo.dateOfBirth": "body.CdtTrfTxInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt",
    "body.payer.supportedCurrencies": "body.CdtTrfTxInf.Dbtr.Acct.Ccy",
    "body.amountType": "body.CdtTrfTxInf.ChrgBr",
    "body.fees.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
    "body.fees.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
    "body.currencyConversion.sourceAmount.currency": "body.CdtTrfTxInf.InstdAmt.Ccy",
    "body.currencyConversion.sourceAmount.amount": "body.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
    "body.amount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "body.amount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
    "body.note": "body.CdtTrfTxInf.InstrForNxtAgt.InstrInf",
    "body.expiration": "body.GrpHdr.PmtInstrXpryDtTm",
    "body.transactionType.scenario": "body.GroupHeader129.CdtTrfTxInf.Purp"
  }`,
  put: `{
    "body.transferAmount.currency": "body.CdtTrfTxInf.InstdAmt.Ccy",
    "body.transferAmount.amount": "body.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
    "body.payeeReceiveAmount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "body.payeeReceiveAmount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
    "body.payeeFspCommission.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
    "body.payeeFspCommission.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
    "body.expiration": "body.GrpHdr.PmtInstrXpryDtTm",
    "body.ilpPacket": "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
    "body.condition": "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket.condition"
  }`,
  putError: `{
    "body.errorInformation.errorCode": "body.TxInfAndSts.TxSts",
    "body.errorInformation.errorDescription": "body.TxInfAndSts.StsRsnInf.AddtInf"
  }`
}

export const quotes_reverse = {
  
}

// export const quotes = {
//   post: `{
//     "body.quoteId": "body.CdtTrfTxInf.PmtId.TxId",
//     "body.transactionId": "body.CdtTrfTxInf.PmtId.EndToEndId",
//     "body.transactionRequestId": "body.CdtTrfTxInf.PmtId.InstrId",
//     "body.payee.partyIdInfo.partyIdType": "body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd",
//     "body.payee.partyIdInfo.partyIdentifier": "body.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id",
//     "body.payee.merchantClassificationCode": "body.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id",
//     "body.payee.name": "body.CdtTrfTxInf.Cdtr.Name",
//     "body.payee.partyIdInfo.dateOfBirth": "body.CdtTrfTxInf.Cdtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt",
//     "body.payee.supportedCurrencies": "body.CdtTrfTxInf.CdtrAcct.Ccy",
//     "body.payer.partyIdInfo.partyIdType": "body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Cd",
//     "body.payer.partyIdInfo.partyIdentifier": "body.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id",
//     "body.payer.partyIdInfo.fspId": "body.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id",
//     "body.payer.name": "body.CdtTrfTxInf.Dbtr.Name",
//     "body.payer.partyIdInfo.dateOfBirth": "body.CdtTrfTxInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt",
//     "body.payer.supportedCurrencies": "body.CdtTrfTxInf.Dbtr.Acct.Ccy",
//     "body.amountType": "body.CdtTrfTxInf.ChrgBr",
//     "body.fees.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
//     "body.fees.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
//     "body.currencyConversion.sourceAmount.currency": "body.CdtTrfTxInf.InstdAmt.Ccy",
//     "body.currencyConversion.sourceAmount.amount": "body.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
//     "body.amount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
//     "body.amount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
//     "body.note": "body.CdtTrfTxInf.InstrForNxtAgt.InstrInf",
//     "body.expiration": "body.GrpHdr.PmtInstrXpryDtTm",
//     "body.transactionType.scenario": "body.GroupHeader129.CdtTrfTxInf.Purp"
//   }`,
//   put: `{
//     "body.transferAmount.currency": "body.CdtTrfTxInf.InstdAmt.Ccy",
//     "body.transferAmount.amount": "body.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
//     "body.payeeReceiveAmount.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
//     "body.payeeReceiveAmount.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
//     "body.payeeFspCommission.currency": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
//     "body.payeeFspCommission.amount": "body.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
//     "body.expiration": "body.GrpHdr.PmtInstrXpryDtTm",
//     "body.ilpPacket": "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
//     "body.condition": "body.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket.condition"
//   }`,
//   putError: `{
//     "body.errorInformation.errorCode": "body.TxInfAndSts.TxSts",
//     "body.errorInformation.errorDescription": "body.TxInfAndSts.StsRsnInf.AddtInf"
//   }`
// }
