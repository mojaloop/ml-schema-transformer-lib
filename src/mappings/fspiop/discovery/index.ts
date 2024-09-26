// FSPIOP to FSPIOP ISO2022 mappings
export const discovery = {
  parties: {
    put: `{
      'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtry': 'party.partyIdInfo.partyIdType',
      'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id': 'party.partyIdInfo.partyIdentifier',
      'GetParties_IdentificationVerificationReportV03.Assgnmt.Assgne.Agt.FinInstnId.Othr.Id': 'party.partyIdInfo.fspId',
      'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Nm': 'party.name',
      'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvtId.DtAndPlcOfBirth.BirthDt': 'party.partyIdInfo.dateOfBirth',
      'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.CashAccount40.Ccy': 'party.supportedCurrencies'
    }`,
    putError: `{
      "GetPartiesError_IdentificationVerificationReportV03.Rpt.Rsn.Cd": "errorInformation.errorCode"
    }`
  }
}

