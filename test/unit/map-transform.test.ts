import { fspiop, fspiop_iso20022 } from './fixtures'

// FSPIOP to FSPIOP ISO2022 mapping
// POST /quotes 
const mapping = `{
    "quoteId": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.TxId",
    "transactionId": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.EndToEndId",
    "transactionRequestId": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.InstrId",
    "payee.partyIdInfo.partyIdType": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Cd",
    "payee.partyIdInfo.partyIdentifier": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id",
    "payee.partyIdInfo.fspId": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id",
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
    "amountType": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.ChrgBr",
    "amount.currency": "TTermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "amount.amount": "TTermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
    "fees.currency": "TTermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.Ccy",
    "fees.amount": "TTermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount",
    "transactionType.scenario": "TermsRequest_FIToFICustomerCreditProposal.GroupHeader129.CdtTrfTxInf.Purp",
    "transactionType.refundInfo.originalTransactionId": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.PmtId.TxId",
    "currencyConversion.sourceAmount.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.Ccy",
    "currencyConversion.sourceAmount.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount",
    "currencyConversion.targetAmount.currency": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.Ccy",
    "currencyConversion.targetAmount.amount": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount",
    "note": "TermsRequest_FIToFICustomerCreditProposal.CdtTrfTxInf.InstrForNxtAgt.InstrInf",
    "expiration": "TermsRequest_FIToFICustomerCreditProposal.GrpHdr.PmtInstrXpryDtTm"
}`

// const mapper = mapTransform(mapping)

// const target = mapper(fspiop.quotes.post)

// console.log(target)

describe ('Unit Tests -->', () => {
    test('dummy unit test', async () => {
    //   const transformer = await createTransformer();
      expect(true).toBe(true);
    });
  });