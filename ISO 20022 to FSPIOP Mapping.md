# ISO 20022 to FSPIOP payload mapping

## ISO 20022 message version mapping table

| **Resource** | **ISO message** |
|--- |--- |
| [**PUT**/parties{Type}/{ID}](#putpartiestypeid--acmt02400104-to-fspiop) | acmt.024.001.04 |
| [**PUT**/parties{Type}/{ID}/error](#putpartiestypeiderror--acmt02400104-to-fspiop) | acmt.024.001.04 |
| [**POST**/quotes](#postquotes--pacs08100101-to-fspiop) | pacs.081.001.01 |
| [**PUT**/quotes/{ID}](#putquotesid--pacs08200101-to-fspiop) | pacs.082.001.01 |
| [**PUT**/quotes/{ID}/error](#putquotesiderror--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**POST**/transfers](#posttransfers--pacs00800113-to-fspiop) | pacs.008.001.13 |
| [**PATCH**/transfers/{ID}](#patchtransfersid--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**PUT**/transfers/{ID}](#puttransfersid--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**PUT**/transfers/{ID}/error](#puttransfersiderror--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**POST**/fxquotes](#postfxquotes--pacs09100101-to-fspiop) | pacs.091.001.01 |
| [**PUT**/fxquotes/{ID}](#putfxquotesid--pacs092001-to-fspiop) | pacs.092.001 |
| [**PUT**/fxquotes/{ID}/error](#putfxquotesiderror--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**POST**/fxTransfers](#postfxtransfers--pacs00900112-to-fspiop) | pacs.009.001.12 |
| [**PUT**/fxTransfers/{ID}](#putfxtransfersid--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**PUT**/fxTransfers/{ID}/error](#putfxtransfersiderror--pacs00200115-to-fspiop) | pacs.002.001.15 |
| [**PATCH**/fxTransfers/{ID}](#patchfxtransfersid--pacs00200115-to-fspiop) | pacs.002.001.15 |

## Detailed Field mapping from ISO 20022 to FSPIOP payloads

### **PUT**/parties{Type}/{ID} : acmt.024.001.04 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | party.partyIdInfo.partyIdType | if(Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtry)party.partyIdInfo.partyIdType = Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtryelse if(Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvtId.Othr.SchmeNm.Prtry)party.partyIdInfo.partyIdType = Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvtId.Othr.SchmeNm.Prtryelseparty.partyIdInfo.partyIdType = Rpt.UpdtdPtyAndAcctId.Pty.PrvtId.Othr.Id |
| TRUE |  | party.partyIdInfo.partyIdentifier | if(Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id)party.partyIdInfo.partyIdentifier = Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Idelse party.partyIdInfo.partyIdentifier = Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvtId.Othr.Id |
| TRUE |  | party.partyIdInfo.fspId | Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.Othr.Id |
| TRUE |  | party.name | Rpt.UpdtdPtyAndAcctId.Pty.Nm |
| TRUE |  | party.supportedCurrencies | Rpt.UpdtdPtyAndAcctId.Acct.Ccy |

### **PUT**/parties{Type}/{ID}/error : acmt.024.001.04 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | errorInformation.errorCode | Rpt.Rsn.Cd |
| Non-Critical |  | errorInformation.errorDescription | getDescriptionfromCode(Rpt.Rsn.Cd) |
|  | TRUE | generateID() | Assgnmt.MsgId |
|  | TRUE | datetimeNow() | Assgnmt.CreDtTm |
|  |  | $header.FSPIOP-Source | Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id |
|  |  | $header.FSPIOP-Destination | Assgnmt.Assgne.Agt.FinInstnId.Othr.Id |
|  |  | $params.IdPath | Rpt.OrgnlId |

### **POST**/quotes : pacs.081.001.01 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | quoteId | CdtTrfTxInf.PmtId.TxId |
| TRUE |  | expiration | GrpHdr.PmtInstrXpryDtTm |
|  |  | transactionId | CdtTrfTxInf.PmtId.EndToEndId |
|  |  | transactionRequestId | CdtTrfTxInf.PmtId.InstrId |
| TRUE |  | payee.partyIdInfo.partyIdType | if(CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Prtry)payee.partyIdInfo.partyIdType = CdtTrfTxInf.Cdtr.Id.OrgId.Othr.SchmeNm.Prtryelsepayee.partyIdInfo.partyIdType = CdtTrfTxInf.Cdtr.Id.PrvtId.Othr.SchmeNm.Prtry |
| TRUE |  | payee.partyIdInfo.partyIdentifier | if(CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id)payee.partyIdInfo.partyIdentifier = CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Idelsepayee.partyIdInfo.partyIdentifier = CdtTrfTxInf.Cdtr.Id.PrvtId.Othr.Id |
| TRUE |  | payee.partyIdInfo.fspId | CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id |
| TRUE |  | payee.name | CdtTrfTxInf.Cdtr.Name |
| TRUE |  | payee.supportedCurrencies | CdtTrfTxInf.CdtrAcct.Ccy |
| TRUE |  | payer.partyIdInfo.partyIdType | if(CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Prtry)payer.partyIdInfo.partyIdType = CdtTrfTxInf.Dbtr.Id.OrgId.Othr.SchmeNm.Prtryelsepayer.partyIdInfo.partyIdType = CdtTrfTxInf.Dbtr.Id.PrvtId.Othr.SchmeNm.Prtry |
| TRUE |  | payer.partyIdInfo.partyIdentifier | if(CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id)payer.partyIdInfo.partyIdentifier = CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Idelsepayer.partyIdInfo.partyIdentifier = CdtTrfTxInf.Dbtr.Id.PrvtId.Othr.Id |
| TRUE |  | payer.partyIdInfo.fspId | CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id |
| TRUE |  | payer.name | CdtTrfTxInf.Dbtr.Name |
| TRUE |  | payer.supportedCurrencies | CdtTrfTxInf.DbtrAcct.Ccy |
| TRUE |  | amount.currency | CdtTrfTxInf.IntrBkSttlmAmt.Ccy |
| TRUE |  | amount.amount | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount |
| TRUE |  | amountType | if (CdtTrfTxInf.ChrgBr=DEBT)amountType = RECEIVEelse amountType = SEND |
| TRUE |  | transactionType.scenario | CdtTrfTxInf.Purp.Prtry |
| TRUE |  | transactionType.initiator | if (CdtTrfTxInf.PmtId.InstrId is null)"PAYER"else"PAYEE" |
| TRUE |  | transactionType.initiatorType | if (CdtTrfTxInf.PmtId.InstrId is null){  if(CdtTrfTxInf.Dtr.Id.Pty)     transactionType.initiatorType='CONSUMER'  else    transactionType.initiatorType='BUSINESS'}else {  if(CdtTrfTxInf.Cdr.Id.Pty)     transactionType.initiatorType='CONSUMER'  else    transactionType.initiatorType='BUSINESS'} |
|  |  | transactionType.refundInfo.originalTransactionId | if(CdtTrfTxInf.PmtId.InstrId)transactionType.refundInfo.originalTransactionId = CdtTrfTxInf.PmtId.InstrId |
|  |  | transactionType.refundInfo.refundReason | If (CdtTrfTxInf.InstrForCdtrAgt.Cd == REFD)CdtTrfTxInf.InstrForCdtrAgt.InstrInf = transactionType.refundInfo.reason |

### **PUT**/quotes/{ID} : pacs.082.001.01 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
|  |  | {$headers[fspiop-destination]} | CdtTrfTxInf.Dbtr.Id.OrgId.Othr.Id |
|  |  | {$headers[fspiop-source] | CdtTrfTxInf.Cdtr.Id.OrgId.Othr.Id |
| TRUE |  | expiration | GrpHdr.PmtInstrXpryDtTm |
| TRUE |  | transferAmount.currency | CdtTrfTxInf.IntrBkSttlmAmt.Ccy |
| TRUE |  | transferAmount.amount | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount |
|  |  | payeeReceiveAmount.currency | CdtTrfTxInf.InstdAmt.Ccy |
|  |  | payeeReceiveAmount.amount | CdtTrfTxInf.InstdAmt.ActiveCurrencyAndAmount |
|  |  | payeeFspFee.currency | CdtTrfTxInf.ChrgsInf.Amt.Ccy |
|  |  | payeeFspFee.amount | CdtTrfTxInf.ChrgsInf.Amt.ActiveOrHistoricCurrencyAndAmount |
| TRUE |  | ilpPacket | CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket |
| TRUE |  | condition | condition = decodeAndGetConditionFromIlp(CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket) |

### **PUT**/quotes/{ID}/error : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | errorInformation.errorCode | TxInfAndSts.StsRsnInf.Rsn.Cd |
|  |  | errorInformation.errorDescription | getDescriptionfromCode(TxInfAndSts.StsRsnInf.Rsn.Cd) |

### **POST**/transfers : pacs.008.001.13 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | expiration | GrpHdr.PmtInstrXpryDtTm |
| TRUE |  | transferId | CdtTrfTxInf.PmtId.TxId |
| TRUE |  | payeeFsp | CdtTrfTxInf.CdtrAgt.FinInstnId.Othr.Id |
| TRUE |  | payerFsp | CdtTrfTxInf.DbtrAgt.FinInstnId.Othr.Id |
| TRUE |  | amount.currency | CdtTrfTxInf.IntrBkSttlmAmt.Ccy |
| TRUE |  | amount.amount | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount |
| TRUE |  | ilpPacket | CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket |
| TRUE |  | condition | condition = decodeAndGetConditionFromIlp(CdtTrfTxInf.VrfctnOfTerms.IlpV4PrepPacket) |

### **PATCH**/transfers/{ID} : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | completedTimestamp | TxInfAndSts.PrcgDt.DtTm |
| TRUE |  | transferState | toFSPIOPTransferState(TxInfAndSts.TxSts) |

### **PUT**/transfers/{ID} : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | fulfilment | TxInfAndSts.ExctnConf |
| TRUE |  | completedTimestamp | TxInfAndSts.PrcgDt.DtTm |
| TRUE |  | transferState | toFSPIOPTransferState(TxInfAndSts.TxSts) |

### **PUT**/transfers/{ID}/error : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | errorInformation.errorCode | TxInfAndSts.StsRsnInf.Rsn.Cd |
|  |  | errorInformation.errorDescription | getDescriptionfromCode(TxInfAndSts.StsRsnInf.Rsn.Cd) |

### **POST**/fxquotes : pacs.091.001.01 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | conversionTerms.expiration | GrpHdr.PmtInstrXpryDtTm |
| TRUE |  | conversionRequestId | CdtTrfTxInf.PmtId.TxId |
| TRUE |  | conversionTerms.conversionId | CdtTrfTxInf.PmtId.InstrId |
| TRUE |  | conversionTerms.determiningTransferId | CdtTrfTxInf.PmtId.EndToEndId  |
| TRUE |  | conversionTerms.initiatingFsp | CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id |
| TRUE |  | conversionTerms.counterPartyFsp | CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id |
| TRUE |  | conversionTerms.amountType | CdtTrfTxInf.InstrForCdtrAgt.InstrInf |
| TRUE |  | conversionTerms.sourceAmount.currency | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy |
| TRUE |  | conversionTerms.sourceAmount.amount | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount |
| TRUE |  | conversionTerms.targetAmount.currency | CdtTrfTxInf.IntrBkSttlmAmt.Ccy |

### **PUT**/fxquotes/{ID} : pacs.092.001 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | condition | CdtTrfTxInf.VrfctnOfTerms.Sh256Sgntr |
| TRUE |  | conversionTerms.conversionId | CdtTrfTxInf.VrfctnOfTerms.PmtId.InstrId |
| TRUE |  | conversionTerms.determiningTransferId | CdtTrfTxInf.PmtId.TxId |
| TRUE |  | conversionTerms.initiatingFsp | CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id |
| TRUE |  | conversionTerms.counterPartyFsp | CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id |
| TRUE |  | conversionTerms.amountType | CdtTrfTxInf.InstrForCdtrAgt.InstrInf |
| TRUE |  | conversionTerms.sourceAmount.currency | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy |
| TRUE |  | conversionTerms.sourceAmount.amount | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount |
| TRUE |  | conversionTerms.targetAmount.currency | CdtTrfTxInf.IntrBkSttlmAmt.Ccy |
| TRUE |  | conversionTerms.targetAmount.amount | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount |
| TRUE |  | conversionTerms.expiration | GrpHdr.PmtInstrXpryDtTm |

### **PUT**/fxquotes/{ID}/error : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | errorInformation.errorCode | TxInfAndSts.StsRsnInf.Rsn.Cd |
|  |  | errorInformation.errorDescription | getDescriptionfromCode(TxInfAndSts.StsRsnInf.Rsn.Cd) |

### **POST**/fxTransfers : pacs.009.001.12 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | expiration | GrpHdr.PmtInstrXpryDtTm |
| TRUE |  | commitRequestId | CdtTrfTxInf.PmtId.TxId |
| TRUE |  | determiningTransferId | CdtTrfTxInf.PmtId.EndToEndId |
| TRUE |  | initiatingFsp | CdtTrfTxInf.Dbtr.FinInstnId.Othr.Id |
| TRUE |  | counterPartyFsp | CdtTrfTxInf.Cdtr.FinInstnId.Othr.Id |
| TRUE |  | sourceAmount.currency | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.Ccy |
| TRUE |  | sourceAmount.amount | CdtTrfTxInf.UndrlygCstmrCdtTrf.InstdAmt.ActiveOrHistoricCurrencyAndAmount |
| TRUE |  | targetAmount.currency | CdtTrfTxInf.IntrBkSttlmAmt.Ccy |
| TRUE |  | targetAmount.amount | CdtTrfTxInf.IntrBkSttlmAmt.ActiveCurrencyAndAmount |
| TRUE |  | condition | CdtTrfTxInf.VrfctnOfTerms.Sh256Sgntr |

### **PUT**/fxTransfers/{ID} : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | fulfilment | TxInfAndSts.ExctnConf |
| TRUE |  | completedTimestamp | TxInfAndSts.PrcgDt.DtTm |
| TRUE |  | transferState | toFSPIOPTransferState(TxInfAndSts.TxSts) |

### **PUT**/fxTransfers/{ID}/error : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | errorInformation.errorCode | TxInfAndSts.StsRsnInf.Rsn.Cd |
|  |  | errorInformation.errorDescription | getDescriptionfromCode(TxInfAndSts.StsRsnInf.Rsn.Cd) |

### **PATCH**/fxTransfers/{ID} : pacs.002.001.15 to FSPIOP

| Required by FSPIOP | Required by ISO 20022 | FSPIOP Field | ISO20022 Mapping |
|--- |--- |--- |--- |
| TRUE |  | completedTimestamp | TxInfAndSts.PrcgDt.DtTm  |
| TRUE |  | transferState | toFSPIOPTransferState(TxInfAndSts.TxSts) |
