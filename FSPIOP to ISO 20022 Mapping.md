# FSPIOP to ISO 20022 payload mapping

## ISO 20022 message version mapping table

| **Resource** | **ISO message** |
|--- |--- |
| [**PUT**/parties{Type}/{ID}](#putpartiestypeid--fspiop-to-acmt02400104) | acmt.024.001.04 |
| [**PUT**/parties{Type}/{ID}/error](#putpartiestypeiderror--fspiop-to-acmt02400104) | acmt.024.001.04 |
| [**POST**/quotes](#postquotes--fspiop-to-pacs08100101) | pacs.081.001.01 |
| [**PUT**/quotes/{ID}](#putquotesid--fspiop-to-pacs08200101) | pacs.082.001.01 |
| [**PUT**/quotes/{ID}/error](#putquotesiderror--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**POST**/transfers](#posttransfers--fspiop-to-pacs00800113) | pacs.008.001.13 |
| [**PATCH**/transfers/{ID}](#patchtransfersid--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**PUT**/transfers/{ID}](#puttransfersid--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**PUT**/transfers/{ID}/error](#puttransfersiderror--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**POST**/fxquotes](#postfxquotes--fspiop-to-pacs09100101) | pacs.091.001.01 |
| [**PUT**/fxquotes/{ID}](#putfxquotesid--fspiop-to-pacs092001) | pacs.092.001 |
| [**PUT**/fxquotes/{ID}/error](#putfxquotesiderror--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**POST**/fxTransfers](#postfxtransfers--fspiop-to-pacs00900112) | pacs.009.001.12 |
| [**PUT**/fxTransfers/{ID}](#putfxtransfersid--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**PUT**/fxTransfers/{ID}/error](#putfxtransfersiderror--fspiop-to-pacs00200115) | pacs.002.001.15 |
| [**PATCH**/fxTransfers/{ID}](#patchfxtransfersid--fspiop-to-pacs00200115) | pacs.002.001.15 |

## Detailed Field mapping from FSPIOP to ISO 20022 payloads

### **PUT**/parties{Type}/{ID} : FSPIOP to acmt.024.001.04

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
| TRUE | TRUE | Assgnmt.MsgId | generateID() |
|  | TRUE | Assgnmt.CreDtTm | datetimeNow() |
|  | TRUE | Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id | $header.FSPIOP-Source |
|  | TRUE | Assgnmt.Assgne.Agt.FinInstnId.Othr.Id | $header.FSPIOP-Destination |
|  | TRUE | Rpt.OrgnlId | {$params.IdPath} |
|  | TRUE | Rpt.Vrfctn | TRUE |
| TRUE |  | Rpt.UpdtdPtyAndAcctId.Pty.Id.{PrvId/OrgId}.Othr.SchmeNm.Prtry | if(party.PartyIdInfo.PartyIdType == BUSINESS or party.PartyIdInfo.PartyIdType ==  ALIAS or party.PartyIdInfo.PartyIdType ==  DEVICE)Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtry = party.partyIdInfo.partyIdTypeelseRpt.UpdtdPtyAndAcctId.Pty.Id.PrvId.Othr.SchmeNm.Prtry = party.partyIdInfo.partyIdType |
| TRUE |  | Rpt.UpdtdPtyAndAcctId.Pty.Id.{PrvId/OrgId}.Othr.Id | if(party.PartyIdInfo.PartyIdType == BUSINESS or party.PartyIdInfo.PartyIdType ==  ALIAS or party.PartyIdInfo.PartyIdType ==  DEVICE)Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id = party.partyIdInfo.partyIdentifierelseRpt.UpdtdPtyAndAcctId.Pty.Id.PrvId.Othr.Id = party.partyIdInfo.partyIdentifier |
| TRUE |  | Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.Othr.Id | party.partyIdInfo.fspId |
| TRUE |  | Rpt.UpdtdPtyAndAcctId.Pty.Nm | party.name |
| TRUE |  | Rpt.UpdtdPtyAndAcctId.Acct.Ccy | party.supportedCurrencies |

### **PUT**/parties{Type}/{ID}/error : FSPIOP to acmt.024.001.04

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
| TRUE | TRUE | Rpt.Rsn.Cd | errorInformation.errorCode |
| TRUE | TRUE | Assgnmt.MsgId | $path_params.id |
|  | TRUE | Assgnmt.CreDtTm | datetimeNow() |
|  | TRUE | Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id | $header.FSPIOP-Source |
|  | TRUE | Assgnmt.Assgne.Agt.FinInstnId.Othr.Id | $header.FSPIOP-Destination |
|  | TRUE | Rpt.OrgnlId | {$params.IdPath} |
|  | TRUE | Rpt.Vrfctn | FALSE |


### **POST**/quotes : FSPIOP to pacs.081.001.01

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
|  | TRUE | GprHdr.NbOfTxs | 1 |
|  | TRUE | GrpHdr.PmtInstrXpryDtTm | expiration |
|  | TRUE | GrpHdr.SttlmInf.SttlmMtd | CLRG |
| TRUE |  | CdtTrfTxInf.PmtId.TxId | quoteId |
|  |  | CdtTrfTxInf.PmtId.EndToEndId | transactionId |
|  |  | CdtTrfTxInf.PmtId.InstrId | transactionRequestId |
| TRUE | TRUE | CdtTrfTxInf.Cdtr.Id.{OrgId/PrvtId}.Othr.SchmeNm.Prtry | if(payee.partyIdInfo.PartyIdType == BUSINESS or payee.partyIdInfo.PartyIdType ==  ALIAS  or payee.partyIdInfo.PartyIdType ==  DEVICE)CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Prtry = payee.partyIdInfo.partyIdTypeelseCdtTrfTxInf.Cdtr.Id.PrvtId.Othr.SchmeNm.Prtry = payee.partyIdInfo.partyIdType |
| TRUE | TRUE | CdtTrfTxInf.Cdtr.Id.{OrgId/PrvtId}.Othr.Id | if(payee.PartyIdInfo.PartyIdType == BUSINESS or payee.PartyIdInfo.PartyIdType ==  ALIAS  or payee.PartyIdInfo.PartyIdType ==  DEVICE)CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id = payee.partyIdInfo.partyIdentifierelseCdtTrfTxInf.Cdtr.Id.PrvtId.Othr.Id = payee.partyIdInfo.partyIdentifier |
| TRUE | TRUE | CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id | payee.partyIdInfo.fspId |
| TRUE | TRUE | CdtTrfTxInf.Cdtr.Name | payee.name |
| TRUE |  | CdtTrfTxInf.CdtrAcct.Ccy | payee.supportedCurrencies |
| TRUE | TRUE | CdtTrfTxInf.Dbtr.Id.{OrgId/PrvtId}.Othr.SchmeNm.Prtry | if(payer.partyIdInfo.PartyIdType == BUSINESS or payer.partyIdInfo.PartyIdType ==  ALIAS or payer.partyIdInfo.PartyIdType ==  DEVICE)CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Prtry = payer.partyIdInfo.partyIdTypeelseCdtTrfTxInf.Dbtr.Id.PrvtId.Othr.SchmeNm.Prtry = payer.partyIdInfo.partyIdType |
| TRUE | TRUE | CdtTrfTxInf.Dbtr.Id.{OrgId/PrvtId}.Othr.Id | if(payer.partyIdInfo.PartyIdType == BUSINESS or payer.partyIdInfo.PartyIdType ==  ALIAS or payer.partyIdInfo.PartyIdType ==  DEVICE)CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id = payer.partyIdInfo.partyIdentifierelseCdtTrfTxInf.Dbtr.Id.PrvtId.Othr.Id = payer.partyIdInfo.partyIdentifier |
| TRUE |  | CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id | payer.partyIdInfo.fspId |
| TRUE | TRUE | CdtTrfTxInf.Dbtr.Name | payer.name |
| TRUE |  | CdtTrfTxInf.DbtrAcct.Ccy | payer.supportedCurrencies |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.Ccy | amount.currency |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount | amount.amount |
| TRUE |  | CdtTrfTxInf.ChrgBr | if (amountType=SEND)CdtTrfTxInf.ChrgBr = CREDelse CdtTrfTxInf.ChrgBr = DEBT |
| TRUE |  | CdtTrfTxInf.Purp.Prtry | transactionType.scenario |
|  |  | CdtTrfTxInf.PmtId.InstrId | if (transactionType.refundInfo.originalTransactionId)CdtTrfTxInf.PmtId.InstrId = transactionType.refundInfo.originalTransactionId |
|  |  | CdtTrfTxInf.InstrForCdtrAgt.Cd | If (transactionType.refundInfo)CdtTrfTxInf.InstrForCdtrAgt.Cd = "REFD" |
|  |  | CdtTrfTxInf.InstrForCdtrAgt.InstrInf | If (transactionType.refundInfo)CdtTrfTxInf.InstrForCdtrAgt.InstrInf = transactionType.refundInfo.reason |
| TRUE |  | GrpHdr.PmtInstrXpryDtTm | expiration |

### **PUT**/quotes/{ID} : FSPIOP to pacs.082.001.01

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
| TRUE |  | GrpHdr.PmtId.TxId | $path_params.id |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
|  | TRUE | GprHdr.NbOfTxs | 1 |
| TRUE |  | GrpHdr.PmtInstrXpryDtTm | expiration |
|  | TRUE | GrpHdr.SttlmInf.SttlmMtd | CLRG |
|  | TRUE | CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id | {$previous.isoPostQuote.CdtTrfTxInf.Dbtr} |
|  | TRUE | CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id | {$previous.isoPostQuote.CdtTrfTxInf.DbtrAgt} |
|  | TRUE | CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id | {$previous.isoPostQuote.CdtTrfTxInf.Cdtr} |
|  | TRUE | CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id | {$previous.isoPostQuote.CdtTrfTxInf.CdtrAgt} |
|  | TRUE | CdtTrfTxInf.ChrgBr | {$previous.isoPostQuote.CdtTrfTxInf.ChrgBr} |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.Ccy | transferAmount.currency |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount | transferAmount.amount |
|  |  | CdtTrfTxInf.InstdAmt.Ccy | payeeReceiveAmount.currency |
|  |  | CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount | payeeReceiveAmount.amount |
| TRUE |  | CdtTrfTxInf.ChrgsInf.Amt.Ccy | payeeFspFee.currency |
| TRUE |  | CdtTrfTxInf.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount | payeeFspFee.amount |
|  | TRUE | CdtTrfTxInf.ChrgsInf.Agt.FinInstnId.Othr.Id | {$previous.isoPostQuote.CdtTrfTxInf.CdtrAgt} |
| TRUE |  | CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket | ilpPacket |

### **PUT**/quotes/{ID}/error : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.StsRsnInf.Rsn.Cd | errorInformation.errorCode |

### **POST**/transfers : FSPIOP to pacs.008.001.13

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
|  | TRUE | GprHdr.NbOfTxs | 1 |
| TRUE | TRUE | GrpHdr.PmtInstrXpryDtTm | expiration |
|  | TRUE | GrpHdr.SttlmInf.SttlmMtd | CLRG |
|  | TRUE | CdtTrfTxInf.ChrgBr | {$previous.postQuoteResponse.CdtTrfTxInf.ChrgBr} |
|  | TRUE | CdtTrfTxInf.Cdtr | {$previous.postQuoteResponse.CdtTrfTxInf.Cdtr} |
|  | TRUE | CdtTrfTxInf.Dbtr | {$previous.postQuoteResponse.CdtTrfTxInf.Dbtr} |
| TRUE |  | CdtTrfTxInf.PmtId.TxId | transferId |
| TRUE |  | CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id | payeeFsp |
| TRUE |  | CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id | payerFsp |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.Ccy | amount.currency |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount | amount.amount |
| TRUE |  | CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket | ilpPacket |

### **PATCH**/transfers/{ID} : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.PrcgDt.DtTm | completedTimestamp |
| TRUE |  | TxInfAndSts.TxSts | transferState |

### **PUT**/transfers/{ID} : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.ExctnConf | fulfilment |
| TRUE |  | TxInfAndSts.PrcgDt.DtTm | completedTimestamp |
| TRUE |  | TxInfAndSts.TxSts | transferState |

### **PUT**/transfers/{ID}/error : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.StsRsnInf.Rsn.Cd | errorInformation.errorCode |

### **POST**/fxquotes : FSPIOP to pacs.091.001.01

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
|  | TRUE | GprHdr.NbOfTxs | 1 |
| TRUE |  | GrpHdr.PmtInstrXpryDtTm | expiration |
|  | TRUE | GrpHdr.SttlmInf.SttlmMtd | CLRG |
| TRUE |  | CdtTrfTxInf.PmtId.TxId | conversionRequestId |
| TRUE |  | CdtTrfTxInf.PmtId.InstrId | conversionTerms.conversionId |
| TRUE |  | CdtTrfTxInf.PmtId.EndToEndId  | conversionTerms.determiningTransferId |
| TRUE |  | CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id | conversionTerms.initiatingFsp |
| TRUE |  | CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id | conversionTerms.counterPartyFsp |
| TRUE |  | CdtTrfTxInf.InstrForCdtrAgt.InstrInf | conversionTerms.amountType |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.Dbtr.OrgId.Othr.Id.Prtry | conversionTerms.initiatingFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.DbtrAgt.FinInstnId.Othr.Id | conversionTerms.initiatingFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.Cdtr.OrgId.Othr.Id.Prtry | conversionTerms.counterPartyFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.CdtrAgt.FinInstnId.Othr.Id | conversionTerms.counterPartyFsp |
| TRUE |  | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy | conversionTerms.sourceAmount.currency |
| TRUE |  | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount | conversionTerms.sourceAmount.amount |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.Ccy | conversionTerms.targetAmount.currency |
|  | TRUE | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount | 0 |

### **PUT**/fxquotes/{ID} : FSPIOP to pacs.092.001

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
| TRUE |  | CdtTrfTxInf.VrfctnOfTerms.Sh256Sgntr | condition |
| TRUE |  | CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId | conversionTerms.conversionId |
| TRUE |  | CdtTrfTxInf.PmtId.TxId | conversionTerms.determiningTransferId |
| TRUE |  | CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id | conversionTerms.initiatingFsp |
| TRUE |  | CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id | conversionTerms.counterPartyFsp |
| TRUE |  | CdtTrfTxInf.InstrForCdtrAgt.InstrInf | conversionTerms.amountType |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.Dbtr.OrgId.Othr.Id.Prtry | conversionTerms.initiatingFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.DbtrAgt.FinInstnId.Othr.Id | conversionTerms.initiatingFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.Cdtr.OrgId.Othr.Id.Prtry | conversionTerms.counterPartyFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.CdtrAgt.FinInstnId.Othr.Id | conversionTerms.counterPartyFsp |
| TRUE |  | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy | conversionTerms.sourceAmount.currency |
| TRUE |  | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount | conversionTerms.sourceAmount.amount |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.Ccy | conversionTerms.targetAmount.currency |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount | conversionTerms.targetAmount.amount |
| TRUE |  | GrpHdr.PmtInstrXpryDtTm | conversionTerms.expiration |

### **PUT**/fxquotes/{ID}/error : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.StsRsnInf.Rsn.Cd | errorInformation.errorCode |

### **POST**/fxTransfers : FSPIOP to pacs.009.001.12

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
|  | TRUE | GprHdr.NbOfTxs | 1 (For now, bulk TBD) |
| TRUE |  | GrpHdr.PmtInstrXpryDtTm | expiration |
|  | TRUE | GrpHdr.SttlmInf.SttlmMtd | CLRG |
| TRUE |  | CdtTrfTxInf.PmtId.TxId | commitRequestId |
| TRUE |  | CdtTrfTxInf.PmtId.EndToEndId | determiningTransferId |
| TRUE |  | CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id | initiatingFsp |
| TRUE |  | CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id | counterPartyFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.Dbtr.Id.OrgId.Othr.Id | initiatingFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.DbtrAgt.FinInstnId.Othr.Id | initiatingFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.Cdtr.Id.OrgId.Othr.Id | counterPartyFsp |
|  | TRUE | CdtTrfTxInf.UndrlygCstmrCdtTrf.CdtrAgt.FinInstnId.Othr.Id | counterPartyFsp |
| TRUE |  | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy | sourceAmount.currency |
| TRUE |  | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount | sourceAmount.amount |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.Ccy | targetAmount.currency |
| TRUE |  | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount | targetAmount.amount |
| TRUE |  | CdtTrfTxInf.VrfctnOfTerms.Sh256Sgntr | condition |

### **PUT**/fxTransfers/{ID} : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.ExctnConf | fulfilment |
| TRUE |  | TxInfAndSts.PrcgDt.DtTm | completedTimestamp |
| TRUE |  | TxInfAndSts.TxSts | transferState |

### **PUT**/fxTransfers/{ID}/error : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
|  |  | TxInfAndSts.StsRsnInf.Rsn.Cd | errorInformation.errorCode |

### **PATCH**/fxTransfers/{ID} : FSPIOP to pacs.002.001.15

| Required by FSPIOP | Required by ISO 20022 | ISO20022 Field | FSPIOP Mapping |
|--- |--- |--- |--- |
|  | TRUE | GrpHdr.MsgId | generateID() |
|  | TRUE | GrpHdr.CreDtTm | datetimeNow() |
| TRUE |  | TxInfAndSts.PrcgDt.DtTm  | completedTimestamp |
| TRUE |  | TxInfAndSts.TxSts | transferState |