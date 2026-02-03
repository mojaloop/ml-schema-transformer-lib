/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 * Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

import { CustomTransforms } from 'src/lib';
import { Options, State } from 'src/types/map-transform';

describe('Transforms tests', () => {
  describe('isNotEmpty', () => {
    it('isNotEmpty should be true', async () => {
      const data = {
        name: 'John Doe',
      };
      const state = {};
      const result = (CustomTransforms.isNotEmpty as Function)({} as Options)()(data, state as State);
      expect(result).toBe(true);
    });
    it('isNotEmpty should be false', async () => {
      const data = {};
      const state = {};
      const result = (CustomTransforms.isNotEmpty as Function)({} as Options)()(data, state as State);
      expect(result).toBe(false);
    });
  });
  describe('supportedCurrenciesToString', () => {
    it('should return the first currency', async () => {
      const data = ['USD', 'EUR'];
      const state = {};
      const result = (CustomTransforms.supportedCurrenciesToString as Function)({} as Options)()(data, state as State);
      expect(result).toBe('USD');
    });
    it('should return data as is if it is not an array', async () => {
      const data = 'USD';
      const state = {};
      const result = (CustomTransforms.supportedCurrenciesToString as Function)({} as Options)()(data, state as State);
      expect(result).toBe(data);
    });
  });
  describe('toArray', () => {
    it('should return the data as an array', async () => {
      const data = 'USD';
      const state = {};
      const result = (CustomTransforms.toArray as Function)({} as Options)()(data, state as State);
      expect(result).toEqual([data]);
    });
    it('should return data as is if it is already an array', async () => {
      const data = ['USD'];
      const state = {};
      const result = (CustomTransforms.toArray as Function)({} as Options)()(data, state as State);
      expect(result).toEqual(data);
    });
    it('should return undefined if data is undefined', async () => {
      const data = undefined;
      const state = {};
      const result = (CustomTransforms.toArray as Function)({} as Options)()(data, state as State);
      expect(result).toEqual(undefined);
    });
    it('should truncate error description to 105 characters', async () => {
      const data = 'a'.repeat(200);
      const state = {};
      const result = (CustomTransforms.toIsoErrorDescription as Function)({} as Options)()(data, state as State);
      expect(result).toEqual('a'.repeat(105));
    });
  });
  describe('Name parsing functions', () => {
    describe('getFirstFromDelimitedName', () => {
      it('should return the first name from delimited string', async () => {
        const data = 'Henrik;Johannes;Karlsson';
        const state = {};
        const result = (CustomTransforms.getFirstFromDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Henrik');
      });
      it('should return the only name if no delimiter', async () => {
        const data = 'Henrik';
        const state = {};
        const result = (CustomTransforms.getFirstFromDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Henrik');
      });
    });

    describe('getMiddleFromDelimitedName', () => {
      it('should return the second name from delimited string', async () => {
        const data = 'Henrik;Johannes;Karlsson';
        const state = {};
        const result = (CustomTransforms.getMiddleFromDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Johannes');
      });
      it('should return undefined if no second name exists', async () => {
        const data = 'Henrik';
        const state = {};
        const result = (CustomTransforms.getMiddleFromDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBeUndefined();
      });
    });

    describe('getLastFromDelimitedName', () => {
      it('should return the third name from delimited string', async () => {
        const data = 'Henrik;Johannes;Karlsson';
        const state = {};
        const result = (CustomTransforms.getLastFromDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Karlsson');
      });
      it('should return undefined if no third name exists', async () => {
        const data = 'Henrik;Johannes';
        const state = {};
        const result = (CustomTransforms.getLastFromDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBeUndefined();
      });
    });

    describe('makeDelimitedName', () => {
      it('should create delimited name from all three parts', async () => {
        const data = {
          firstName: 'Henrik',
          middleName: 'Johannes',
          lastName: 'Karlsson'
        };
        const state = {};
        const result = (CustomTransforms.makeDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Henrik;Johannes;Karlsson');
      });
      it('should create delimited name without middle name', async () => {
        const data = {
          firstName: 'Henrik',
          lastName: 'Karlsson'
        };
        const state = {};
        const result = (CustomTransforms.makeDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Henrik;;Karlsson');
      });
      it('should create delimited name with only first name', async () => {
        const data = {
          firstName: 'Henrik'
        };
        const state = {};
        const result = (CustomTransforms.makeDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe('Henrik;;');
      });
      it('should handle undefined data gracefully', async () => {
        const data = undefined;
        const state = {};
        const result = (CustomTransforms.makeDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe(undefined);
      });

      it('should handle null data gracefully', async () => {
        const data = null;
        const state = {};
        const result = (CustomTransforms.makeDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe(undefined);
      });

      it('should handle empty object', async () => {
        const data = {};
        const state = {};
        const result = (CustomTransforms.makeDelimitedName as Function)({} as Options)()(data, state as State);
        expect(result).toBe(undefined);
      });
    });
  });
});
