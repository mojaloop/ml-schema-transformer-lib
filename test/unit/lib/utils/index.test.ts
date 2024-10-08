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

 const Util = require('@mojaloop/central-services-shared').Util;
import { ilpCondition, ilpPacket } from 'test/fixtures';
import { generateID, getIlpPacketCondition } from '../../../../src/lib/utils';
import { ID_GENERATOR_TYPE } from '../../../../src/types';


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
      const spy = vi.spyOn(Util, 'id');
      const id = generateID(ID_GENERATOR_TYPE.ulid, { time: 1234567890 });
      expect(id).toBeDefined();
      expect(id.length).toBe(26);
      // expect(spy).toHaveBeenCalledWith({ type: ID_GENERATOR_TYPE.ulid, time: 1234567890 });
    })
  })
  describe('getIlpPacketCondition', () => {
    it('should return the condition from an ILP packet', () => {
      const decodedCondition = getIlpPacketCondition(ilpPacket);
      expect(ilpCondition).toBe(decodedCondition);
    });
  })
});
