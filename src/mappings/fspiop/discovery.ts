// /*****
//  License
//  --------------
//  Copyright © 2017 Bill & Melinda Gates Foundation
//  The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
//  http://www.apache.org/licenses/LICENSE-2.0
//  Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
//  Contributors
//  --------------
//  This is the official list of the Mojaloop project contributors for this file.
//  Names of the original copyright holders (individuals or organizations)
//  should be listed with a '*' in the first column. People who have
//  contributed from an organization can be listed under the organization
//  that actually holds the copyright for their contributions (see the
//  Gates Foundation organization for an example). Those individuals should have
//  their names indented and be marked with a '-'. Email address can be added
//  optionally within square brackets <email>.
//  * Gates Foundation
//  - Name Surname <name.surname@gatesfoundation.com>
 
//  * Steven Oderayi <steven.oderayi@infitx.com>
//  --------------
//  ******/

// // FSPIOP to FSPIOP ISO220022 mappings

// export const discovery = {
//   parties: {
//     put: `{
//       "$noDefaults": true,
//       "body.Assgnmt.MsgId": { "$transform": "generateID" },
//       "body.Assgnmt.CreDtTm": { "$transform": "datetimeNow" },
//       "body.Rpt.Vrfctn": [{ "$transform": "fixed", "value": true, "$direction": "fwd" }],
//       "body.Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id": "headers.FSPIOP-Source",
//       "body.Assgnmt.Assgne.Agt.FinInstnId.Othr.Id": "headers.FSPIOP-Destination",
//       "body.Rpt.OrgnlId": "params.SubId",
//       "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtry": ["body.party.partyIdInfo.partyIdType", { "$filter": "isNotPersonParty" }],
//       "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvId.Othr.SchmeNm.Prtry": ["body.party.partyIdInfo.partyIdType", { "$filter": "isPersonParty" }],
//       "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id": ["body.party.partyIdInfo.partyIdentifier", { "$filter": "isNotPersonParty" }],
//       "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvId.Othr.Id": ["body.party.partyIdInfo.partyIdentifier", { "$filter": "isPersonParty" }],
//       "body.Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.Othr.Id": "body.party.partyIdInfo.fspId",
//       "body.Rpt.UpdtdPtyAndAcctId.Pty.Nm": "body.party.name",
//       "body.Rpt.UpdtdPtyAndAcctId.Acct.Ccy": "body.party.supportedCurrencies"
//     }`,
//     putError: `{
//       "$noDefaults": true,
//       "body.Rpt.Rsn.Cd": "body.errorInformation.errorCode",
//       "body.Assgnmt.MsgId": { "$transform": "generateID" },
//       "body.Assgnmt.CreDtTm": { "$transform": "datetimeNow" },
//       "body.Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id": "headers.FSPIOP-Source",
//       "body.Assgnmt.Assgne.Agt.FinInstnId.Othr.Id": "headers.FSPIOP-Destination",
//       "body.Rpt.OrgnlId": "params.SubId",
//       "body.Rpt.Vrfctn": [{ "$transform": "fixed", "value": false, "$direction": "fwd" }]
//     }`
//   }
// }

// // FSPIOP ISO220022 to FSPIOP  mappings
// // A reverse mapping (with all contant mappings removed) is needed in this case to overcome a bug in map-transform
// // where reverse transform on constant values is not working as expected.

// export const discovery_reverse = {
//   parties: {
//     put: `{
//       "$noDefaults": true,
//       "headers.FSPIOP-Source": "body.Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id",
//       "headers.FSPIOP-Destination": "body.Assgnmt.Assgne.Agt.FinInstnId.Othr.Id",
//       "params.SubId": "body.Rpt.OrgnlId",
//       "body.party.partyIdInfo.partyIdType": { "$alt": [ "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.SchmeNm.Prtry", "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvId.Othr.SchmeNm.Prtry", "body.Rpt.UpdtdPtyAndAcctId.Pty.PrvtId.Othr.Id" ] },
//       "body.party.partyIdInfo.partyIdentifier": "body.Rpt.UpdtdPtyAndAcctId.Pty.Id.PrvId.Othr.Id",
//       "body.party.partyIdInfo.fspId": "body.Rpt.UpdtdPtyAndAcctId.Agt.FinInstnId.Othr.Id",
//       "body.party.name": "body.Rpt.UpdtdPtyAndAcctId.Pty.Nm",
//       "body.party.supportedCurrencies": "body.Rpt.UpdtdPtyAndAcctId.Acct.Ccy"
//     }`,
//     putError: `{
//       "$noDefaults": true,
//       "body.errorInformation.errorDescription": ["body.Rpt.Rsn.Cd", { "$transform": "fspiopErrorDescrForCode" }],
//       "body.errorInformation.errorCode": "body.Rpt.Rsn.Cd",
//       "headers.FSPIOP-Source": "body.Assgnmt.Assgnr.Agt.FinInstnId.Othr.Id",
//       "headers.FSPIOP-Destination": "body.Assgnmt.Assgne.Agt.FinInstnId.Othr.Id",
//       "params.SubId": "body.Rpt.OrgnlId"
//     }`
//   }
// }
