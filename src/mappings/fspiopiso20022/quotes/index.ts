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

export const quotes = {
  post: `{
    quoteId: "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.TxId",
    transactionId: "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.EndToEndId",
    transactionRequestId: "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.InstrId",
    "payee.partyIdInfo.partyIdType": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd",
    "payee.partyIdInfo.partyIdentifier": "TermsRequest_FIToFICustomerCreditProposals.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id",
    "payee.merchantClassificationCode": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id",
    "payee.name": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Name",
    "payee.partyIdInfo.dateOfBirth": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt",
    "payee.supportedCurrencies": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAcct.Ccy",
    "payer.partyIdInfo.partyIdType": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Cd",
    "payer.partyIdInfo.partyIdentifier": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id",
    "payer.partyIdInfo.fspId": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id",
    "payer.name": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Name",
    "payer.partyIdInfo.dateOfBirth": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt",
    "payer.supportedCurrencies": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Acct.Ccy",
    amountType: "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.ChrgBr",
    "fees.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
    "fees.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
    "currencyConversion.sourceAmount.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy",
    "currencyConversion.sourceAmount.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
    "amount.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "amount.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
    note: "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstrForNxtAgt.InstrInf",
    expiration: "TermsRequest_FIToFICustomerCreditProposal.GrpHdr.PmtInstrXpryDtTm",
    "transactionType.scenario": "TermsRequest_FIToFICustomerCreditProposal.GroupHeader129.CdtTrfTxInf.Purp"
  }`,
  put: `{
    "transferAmount.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy",
    "transferAmount.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
    "payeeReceiveAmount.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "payeeReceiveAmount.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
    "payeeFspCommission.currency": "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
    "payeeFspCommission.amount": "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
    expiration: "TermsResponse_FIToFICustomerCreditConfirmation.GrpHdr.PmtInstrXpryDtTm",
    ilpPacket: "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket",
    condition: "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket.condition"
  }`,
  putError: `{
    "errorInformation.errorCode": "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts",
    "errorInformation.errorDescription": "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf"
  }`
}
