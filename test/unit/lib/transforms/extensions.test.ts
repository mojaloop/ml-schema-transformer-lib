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

import { applyUnrollExtensions } from '../../../../src/lib/transforms/extensions';
import { mockLogger } from '../../../fixtures';

describe('Extensions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('applyUnrollExtensions', () => {
    it('should return target without unrolling extensions if unrollExtensions is false', () => {
      const source = {
        body: {
          extensionList: {
            extensions: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        targetKey: 'targetValue'
      };
      const options = {
        unrollExtensions: false
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping unrollExtensions', { source, target, options });
    });
    it('should return target without unrolling extensions if source.body.extensionList.extensions is falsy', () => {
      const source = {
        body: {
          extensionList: {}
        }
      };
      const target = {
        targetKey: 'targetValue'
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping unrollExtensions', { source, target, options });
    });
    it('should return target with unrolled extensions', () => {
      const source = {
        body: {
          extensionList: {
            extensions: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        targetKey: 'targetValue'
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        targetKey: 'targetValue',
        extensionKey: 'extensionValue'
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should return target with unrolled extensions and merge them with existing keys', () => {
      const source = {
        body: {
          extensionList: {
            extensions: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        targetKey: 'targetValue',
        extensionKey: 'existingValue'
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        targetKey: 'targetValue',
        extensionKey: 'extensionValue'
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should return target with unrolled extensions and merge them with existing nested keys', () => {
      const source = {
        body: {
          extensionList: {
            extensions: [{ key: 'nested.extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        targetKey: 'targetValue',
        nested: {
          extensionKey: 'existingValue'
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        targetKey: 'targetValue',
        nested: {
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { nested: { extensionKey: 'extensionValue' } } });
    });
  });
});