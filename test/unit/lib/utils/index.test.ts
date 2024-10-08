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

import { ilpCondition, ilpPacket } from 'test/fixtures';
import { generateID, getDescrFromErrCode, getIlpPacketCondition, getProp, isEmptyObject, isPersonPartyIdType, setProp, toFspiopTransferState, toIsoTransferState } from '../../../../src/lib/utils';
import { ID_GENERATOR_TYPE } from 'src/types';


describe('Utils tests', () => {
  describe('generateID', () => {
    it('should generate a unique ulid ID (default)', () => {
      const id = generateID();
      expect(id).toBeDefined();
      expect(id.length).toBe(26);
    });
    it('should generate a unique uuid ID', () => {
      const id = generateID(ID_GENERATOR_TYPE.uuid);
      expect(id).toBeDefined();
      expect(id.length).toBe(36);
    });
    it('should generate a unique ulid ID with a custom config', () => {
      const id = generateID(ID_GENERATOR_TYPE.ulid, { time: 1234567890 });
      expect(id).toBeDefined();
      expect(id.length).toBe(26);
    })
  });
  describe('isPersonPartyIdType', () => {
    it('should return true for a person party ID type', () => {
      const partyIdType = 'MSISDN';
      const isPerson = isPersonPartyIdType(partyIdType);
      expect(isPerson).toBe(true);
    });
    it('should return false for a business party ID type', () => {
      const partyIdType = 'BUSINESS';
      const isPerson = isPersonPartyIdType(partyIdType);
      expect(isPerson).toBe(false);
    });
  });
  describe('isEmptyObject', () => {
    it('should return true for an empty object', () => {
      const isEmpty = isEmptyObject({});
      expect(isEmpty).toBe(true);
    });
    it('should return false for a non-empty object', () => {
      const isEmpty = isEmptyObject({ key: 'value' });
      expect(isEmpty).toBe(false);
    });
  });
  describe('setProp', () => {
    it('should set a nested property in an object', () => {
      const obj = {};
      setProp(obj, 'nested.property', 'value');
      expect(obj).toEqual({ nested: { property: 'value' } });
    });
  });
  describe('getProp', () => {
    it('should get a nested property from an object', () => {
      const obj = { nested: { property: 'value' } };
      const value = getProp(obj, 'nested.property');
      expect(value).toBe('value');
    });
    it('should return undefined for a non-existent property', () => {
      const obj = { nested: { property: 'value' } };
      const value = getProp(obj, 'nested.nonexistent');
      expect(value).toBeUndefined();
    })
  });
  describe('getDescrFromErrCode', () => {
    it('should return a description from an error code', () => {
      const description = getDescrFromErrCode('3100');
      expect(description).toBe('Client Validation Error');
    });
    it('should throw an error for an unknown error code', () => {
      expect(() => getDescrFromErrCode('9999')).toThrow();
    });
  });
  describe('getIlpPacketCondition', () => {
    it('should get the condition from an ILP packet', () => {
      const condition = getIlpPacketCondition(ilpPacket);
      expect(condition).toBe(ilpCondition);
    });
    it('should throw an error for an invalid ILP packet', () => {
      expect(() => getIlpPacketCondition('invalid packet')).toThrow();
    });
    it('should throw an error if MLST_ILP_SECRET is not set', () => {
      process.env.MLST_ILP_SECRET = '';
      expect(() => getIlpPacketCondition(ilpPacket)).toThrow();
    });
  });
  describe('toIsoTransferState', () => {
    it('should return undefined if state is falsy', () => {
      const state = toIsoTransferState(null as any);
      expect(state).toBe(undefined);
    });
    it('should convert FSPIOP transfer state to an ISO 20022 state', () => {
      let state = toIsoTransferState('COMMITTED');
      expect(state).toBe('COMM');
      state = toIsoTransferState('ABORTED');
      expect(state).toBe('ABOR');
      state = toIsoTransferState('RECEIVED');
      expect(state).toBe('RECV');
      state = toIsoTransferState('RESERVED');
      expect(state).toBe('RESV');
      state = toIsoTransferState('SETTLED');
      expect(state).toBe('SETT');
    });
    it('should throw an error for an unknown state', () => {
      expect(() => toIsoTransferState('UNKNOWN')).toThrow();
    });
  });
  describe('toFspiopTransferState', () => {
    it('should return undefined if state is falsy', () => {
      const state = toIsoTransferState(null as any);
      expect(state).toBe(undefined);
    });
    it('should convert ISO 20022 transfer state to an FSPIOP state', () => {
      let state = toFspiopTransferState('COMM');
      expect(state).toBe('COMMITTED');
      state = toFspiopTransferState('ABOR');
      expect(state).toBe('ABORTED');
      state = toFspiopTransferState('RECV');
      expect(state).toBe('RECEIVED');
      state = toFspiopTransferState('RESV');
      expect(state).toBe('RESERVED');
      state = toFspiopTransferState('SETT');
      expect(state).toBe('SETTLED');
    });
    it('should throw an error for an unknown state', () => {
      expect(() => toFspiopTransferState('UNKNOWN')).toThrow();
    });
  });
});
