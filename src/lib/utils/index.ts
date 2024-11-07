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
const { CreateFSPIOPErrorFromErrorCode } = require('@mojaloop/central-services-error-handling')
const ilpPacket = require('ilp-packet');
import { ConfigOptions, GenericObject, ID_GENERATOR_TYPE, isContextLogger } from '../../types';

// improve: use enums from cs-shared
// We only cover the states that are externally visible
const fspiopToIsoTransferStateMap: GenericObject = {
  COMMITTED: 'COMM',
  RESERVED: 'RESV',
  RECEIVED: 'RECV',
  ABORTED: 'ABOR'
}

// Generate a unique ID
export const generateID = (idGenType: ID_GENERATOR_TYPE = ID_GENERATOR_TYPE.ulid, config: GenericObject = {}): string => {
  switch (idGenType) {
    case ID_GENERATOR_TYPE.ulid:
    case ID_GENERATOR_TYPE.uuid:
      return idGenerator({ ...config, type: idGenType })();
    default:
      return idGenerator({ ...config, type: ID_GENERATOR_TYPE.ulid })();
  }
}

// improve: import enums from cs-shared
export const isPersonPartyIdType = (partyIdType: string) => partyIdType && !['BUSINESS', 'ALIAS', 'DEVICE'].includes(partyIdType);

export const isEmptyObject = (data: unknown) => {
  return typeof data === 'object' && data !== null && Object.keys(data as object).length === 0;
}

// Safely set nested property in an object
export const setProp = (obj: unknown, path: string, value: unknown) => {
  const pathParts = path.split('.');
  let current = obj as GenericObject;

  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i] as string;
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
  current[pathParts[pathParts.length - 1] as string] = value;
}

// Safely get nested property from an object
export const getProp = (obj: unknown, path: string): unknown  => {
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

// Safely check if nested property exists in an object
export const hasProp = (obj: unknown, path: string): boolean => {
  const pathParts = path.split('.');
  let current = obj;

  for (const part of pathParts) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = (current as GenericObject)[part];
    } else {
      return false;
    }
  }

  return true;
}

export const getDescrForErrCode = (code: string | number): string => {
  try {
    const errorCode = Number.parseInt(code as string);
    const errorCreated = CreateFSPIOPErrorFromErrorCode(errorCode);
    return errorCreated?.apiErrorCode?.type?.description;
  } catch (error) {
    return 'Unknown error';
  }
}

// Get the ILP packet condition from an ILP packet
export const getIlpPacketCondition = (inputIlpPacket: string): GenericObject => {
  const binaryPacket = Buffer.from(inputIlpPacket, 'base64');
  const decoded = ilpPacket.deserializeIlpPrepare(binaryPacket);
  return decoded?.executionCondition?.toString('base64url');
}

// Converts FSPIOP transfer state to FSPIOP ISO20022 transfer state
export const toIsoTransferState = (fspiopState: string): string | undefined => {
  if (!fspiopState) return undefined;
  const isoState = fspiopToIsoTransferStateMap[fspiopState] as string;
  if (!isoState) throw new Error(`toIsoTransferState: Unknown FSPIOP transfer state: ${fspiopState}`);
  return isoState;
}

// Converts FSPIOP ISO20022 transfer state to FSPIOP transfer state
export const toFspiopTransferState = (isoState: string): string | undefined => {
  if (!isoState) return undefined;
  for (const [key, value] of Object.entries(fspiopToIsoTransferStateMap)) {
    if (value === isoState) return key;
  }
  throw new Error(`toFspiopTransferState: Unknown ISO20022 transfer state: ${isoState}`);
}

export const validateConfig = (config: ConfigOptions): void => {
  if (hasProp(config, 'logger') && !isContextLogger(config.logger)) {
    throw new Error('Invalid logger provided');
  }
}