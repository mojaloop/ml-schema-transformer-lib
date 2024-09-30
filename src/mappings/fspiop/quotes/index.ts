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

export const quotes = {
  post: `{
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.TxId": "quoteId",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.EndToEndId": "transactionId",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.InstrId": "transactionRequestId",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd": "payee.partyIdInfo.partyIdType",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id": "payee.partyIdInfo.partyIdentifier",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id": "payee.merchantClassificationCode",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Name": "payee.name",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt": "payee.partyIdInfo.dateOfBirth",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAcct.Ccy": "payee.supportedCurrencies",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Cd": "payer.partyIdInfo.partyIdType",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id": "payer.partyIdInfo.partyIdentifier",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id": "payer.partyIdInfo.fspId",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Name": "payer.name",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Id.PrvtId.DtAndPlcOfBirth.BirthDt": "payer.partyIdInfo.dateOfBirth",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Dbtr.Acct.Ccy": "payer.supportedCurrencies",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.ChrgBr": "amountType",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy": "fees.currency",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount": "fees.amount",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy": "currencyConversion.sourceAmount.currency",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount": "currencyConversion.sourceAmount.amount",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "{ $alt: [ 'amount.currency', { $value: 'currencyConversion.targetAmount.currency' } }",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount": "{ $alt: [ 'amount.amount', { $value: 'currencyConversion.targetAmount.amount' } }",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstrForNxtAgt.InstrInf": "note",
    "TermsRequest_FIToFICustomerCreditProposal.GrpHdr.PmtInstrXpryDtTm": "expiration",
    "TermsRequest_FIToFICustomerCreditProposal.GroupHeader129.CdtTrfTxInf.Purp": "transactionType.scenario"
  }`,
  put: `{
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy": "transferAmount.currency",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount": "transferAmount.amount",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy": "payeeReceiveAmount.currency",
    "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount": "payeeReceiveAmount.amount",
    "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy": "payeeFspCommission.currency",
    "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount": "payeeFspCommission.amount",
    "TermsResponse_FIToFICustomerCreditConfirmation.GrpHdr.PmtInstrXpryDtTm": "expiration",
    "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket": "ilpPacket",
    "TermsResponse_FIToFICustomerCreditConfirmation.CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket.condition": "condition"
  }`,
  putError: `{
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.TxSts": "errorInformation.errorCode",
    "PacsStatus_FIToFIPaymentStatusReportV15.TxInfAndSts.StsRsnInf.AddtInf": "errorInformation.errorDescription"
  }`
}

