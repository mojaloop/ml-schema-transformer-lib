// FSPIOP ISO220022 to FSPIOP mappings

export const discovery = {
  parties: {
    put: `{
      'party.partyIdInfo.partyIdType': 'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtry',
      'party.partyIdInfo.partyIdentifier': 'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id',
      'party.partyIdInfo.fspId': 'GetParties_IdentificationVerificationReportV03.Assgnmt.Assgne.Agt.FinInstnId.Othr.Id',
      'party.name': 'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Nm',
      'party.partyIdInfo.dateOfBirth': 'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvtId.DtAndPlcOfBirth.BirthDt',
      'party.supportedCurrencies': 'GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.CashAccount40.Ccy'
    }`,
    putError: `{
      'errorInformation.errorCode': 'GetPartiesError_IdentificationVerificationReportV03.Rpt.Rsn.Cd'
    }`
  }
}
