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

import { ICustomTransforms } from '../../types';
import { Options, State } from '../../types/map-transform';
import { generateID as genID, isEmptyObject, isPersonPartyIdType, getIlpPacketCondition } from '../utils';
import { getDescrFromErrCode } from '../utils/fspiop20022.utils';

/**
* We define default custom transforms here.
* 
* Example custom transform function
*
*  export const padLeft = (options: any) =>  () => (data: unknown, state: State) => {
*    console.log('pad transform function called with data:', data);
*    return data.padStart(10, '0');
*  };
* 
* Provide the transformer functions to the `mapTransformOptions` parameter of the `createTransformer` function
*
*  const mapping = {};
*  createTransformer(mapping, { mapTransformOptions: { transformers: { padLeft } } });
* 
* Use in mappings like so (remember to use double quotes in the JSON string and not signle quotes, and no trailing commas):
* 
*  {
*   ...,
*   "party.partyIdInfo.partyIdentifier": ["GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id", { "$transform": "padLeft" }],
*   ... other mapping properties
*  }
* 
* In the above, `padLeft` will be used for both forward and reverse transformations.
* 
*  To specify different transform functions for forward and reverse transformations:
*  
*  {
*   ...,
*   "party.partyIdInfo.partyIdentifier": ["GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id", { "$transform": "padLeft" }, { "$transform": "padRight" }],
*   ... other mapping properties
*  }
* 
* In the above, `padLeft` will be used for forward transformation and `padRight` will be used for reverse transformation.
* 
* You may also specify the direction of the transform function:
* {
*   ...,
*   "party.partyIdInfo.partyIdentifier": ["GetParties_IdentificationVerificationReportV03.Rpt.UpdtdPtyAndAcctId.Pty.Id.OrgId.Othr.Id", { "$transform": "padLeft", "$direction": "rev" }, { "$transform": "padRight", "$direction": "fwd" }],
*   ... other mapping properties
*  }
*/

/**
 * Here we define the custom transform functions which are recognized by the transform library.
 */

/**
const fn1 = (options: any) => () => (data: unknown, state: State) => {
  return // process data here;
}

const fn2 = (options: any) => () => (data: unknown, state: State) => {
  return // process data here;
}

CustomTransforms['fn1'] = fn1;
CustomTransforms['fn2'] = fn2;
*/

export const CustomTransforms: ICustomTransforms = {
  generateID: (options: Options) => () => (data: unknown, state: State) => {
    return genID();
  },

  datetimeNow: (options: Options) => () => (data: unknown, state: State) => {
    return new Date().toISOString(); // Not sure if this is the correct format
  },

  isPersonParty: (options: Options) => () => (data: unknown, state: State) => {
    return isPersonPartyIdType(data as string);
  },

  isNotPersonParty: (options: Options) => () => (data: unknown, state: State) => {
    return !isPersonPartyIdType(data as string);
  },

  isNotEmpty: (options: Options) => () => (data: unknown, state: State) => {
    return data && !isEmptyObject(data);
  },

  fspiopErrorDescrForCode: (options: Options) => () => (data: unknown, state: State) => {
    return getDescrFromErrCode(data as string);
  },

  ilpPacketCondition: (options: Options) => () => (data: unknown, state: State) => {
    return getIlpPacketCondition(data as string);
  }
}
