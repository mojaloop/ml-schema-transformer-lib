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

const idGenerator = require('@mojaloop/central-services-shared').Util.id;
import { GenericObject, ID_GENERATOR_TYPE } from '../../types';

export const generateID = (idGenType: ID_GENERATOR_TYPE = ID_GENERATOR_TYPE.ulid, config: GenericObject = {}): string => {
  switch (idGenType) {
    case ID_GENERATOR_TYPE.ulid:
      return idGenerator({ type: idGenType, ...config })();
    case ID_GENERATOR_TYPE.uuid:
      return idGenerator({ type: idGenType, ...config })();
    default:
      return idGenerator({ type: ID_GENERATOR_TYPE.ulid, ...config })();
  }
}

export const isPersonPartyIdType = (partyIdType: string) =>  partyIdType && ['BUSINESS', 'ALIAS', 'DEVICE'].includes(partyIdType);  // improve: import enums from cs-shared

export const isEmptyObject = (data: unknown) => {
  return typeof data === 'object' && data !== null && Object.keys(data as object).length === 0;
}

export * as fspiopIso20022Utils from './fspiop20022.utils';