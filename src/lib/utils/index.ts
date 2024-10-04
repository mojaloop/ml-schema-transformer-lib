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
const Ilp = require('@mojaloop/sdk-standard-components').Ilp;
import { logger } from '../../lib';
import { GenericObject, ID_GENERATOR_TYPE } from '../../types';

/**
 * Generate a unique ID
 * @param idGenType ID generator type
 * @param config Configuration object
 * @returns Unique ID
 */
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

export const isPersonPartyIdType = (partyIdType: string) => partyIdType && !['BUSINESS', 'ALIAS', 'DEVICE'].includes(partyIdType);  // improve: import enums from cs-shared

export const isEmptyObject = (data: unknown) => {
  return typeof data === 'object' && data !== null && Object.keys(data as object).length === 0;
}

// Set nested property in an object
export const setProp = (obj: GenericObject, path: string, value: unknown) => {
  const pathParts = path.split('.');
  let current = obj;

  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i] as string;

    if (!current[part]) {
      current[part] = {};
    }

    current = current[part];
  }

  current[pathParts[pathParts.length - 1] as string] = value;
}

// Get nested property in an object
export function getProp(obj: GenericObject, path: string): unknown {
  const pathParts = path.split('.');
  let current = obj;

  for (const part of pathParts) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = (current as GenericObject)[part];
    } else {
      return undefined;
    }
  }

  return current;
}

// Get the ILP packet condition from an ILP packet
export const getIlpPacketCondition = (ilpPacket: string): GenericObject => {
  // @todo These params should be passed in via a config/options
  const ILP_SECRET = process.env.ILP_SECRET;
  const ILP_VERSION = process.env.ILP_VERSION || Ilp.ILP_VERSIONS.v4;

  if (!ILP_SECRET || !ILP_VERSION) {
    throw new Error('ILP_SECRET and ILP_VERSION environment variables must be set');
  }
  const ilp = Ilp.ilpFactory(ILP_VERSION, { secret: ILP_SECRET, logger });
  const decoded = ilp.decodeIlpPacket(ilpPacket);
  return decoded?.executionCondition?.toString();
}

export * as fspiopIso20022Utils from './fspiop20022.utils';