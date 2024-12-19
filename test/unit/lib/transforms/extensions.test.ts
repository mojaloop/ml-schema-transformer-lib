/*****
 License
 --------------
 Copyright © 2020-2024 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not 
 use these files except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES 
 OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 
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

import { applyUnrollExtensions, applyRollUpUnmappedAsExtensions } from '../../../../src/lib/transforms/extensions';
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
            extension: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: false
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping unrollExtensions', { source, target, options });
    });
    it('should return target without unrolling extensions if source.body.extensionList.extension is falsy', () => {
      const source = {
        body: {
          extensionList: {}
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
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
            extension: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue'
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should return target with unrolled extensions and merge them with existing keys', () => {
      const source = {
        body: {
          extensionList: {
            extension: [{ key: 'extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue',
          extensionKey: 'existingValue'
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          extensionKey: 'extensionValue'
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { extensionKey: 'extensionValue' } });
    });
    it('should return target with unrolled extensions and merge them with existing nested keys', () => {
      const source = {
        body: {
          extensionList: {
            extension: [{ key: 'nested.extensionKey', value: 'extensionValue' }]
          }
        }
      };
      const target = {
        body: {
          targetKey: 'targetValue',
          nested: {
            extensionKey: 'existingValue'
          }
        }
      };
      const options = {
        unrollExtensions: true
      };
      const result = applyUnrollExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual({
        body: {
          targetKey: 'targetValue',
          nested: {
            extensionKey: 'extensionValue'
          }
        }
      });
      expect(mockLogger.debug).toHaveBeenCalledWith('Unrolled extensions', { source, unrolled: { nested: { extensionKey: 'extensionValue' } } });
    });
  });
  describe('applyRollUpUnmappedAsExtensions', () => {
    it('should return target without rolling up extensions if rollUpUnmappedAsExtensions is false', () => {
      const source = {
        body: {
          targetKey: 'sourceValue'
        }
      };
      const target = {
        body: {
          key1: 'value1'
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const options = {
        rollUpUnmappedAsExtensions: false,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('Skipping rollUpUnmappedAsExtensions', { source, target, mapping, options });
    });
    it('should return target without rolling up extensions if extensions is empty', () => {
      const source = {
        body: {
          targetKey: 'sourceValue'
        }
      };
      const target = {
        body: {
          key1: 'value1'
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(target);
      expect(mockLogger.debug).toHaveBeenCalledWith('No unmapped properties to roll up', { source, mapping });
    });
    it('should return target with rolled up extensions', () => {
      const source = {
        body: {
          targetKey: 'targetValue',
          unmappedKey1: 'unmappedValue1'
        }
      };
      const target = {
        body: {
          sourceKey: 'sourceValue'
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const expectedTarget = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [{ key: 'unmappedKey1', value: 'unmappedValue1' }]
          }
        }
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(expectedTarget);
    });
    it('should return target with rolled up extensions and merge them with existing extensions', () => {
      const source = {
        body: {
          targetKey: 'targetValue',
          unmappedKey1: 'unmappedValue1'
        }
      };
      const target = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [{ key: 'unmappedKey2', value: 'unmappedValue2' }]
          }
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const expectedTarget = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [
              { key: 'unmappedKey2', value: 'unmappedValue2' },
              { key: 'unmappedKey1', value: 'unmappedValue1' }
            ]
          }
        }
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(expectedTarget);
    });
    it('should return target with rolled up extensions and merge them with existing extensions with same key', () => {
      const source = {
        body: {
          targetKey: 'targetValue',
          unmappedKey1: 'unmappedValue1'
        }
      };
      const target = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [{ key: 'unmappedKey1', value: 'existingValue' }]
          }
        }
      };
      const mapping = {
        'body.sourceKey': 'body.targetKey'
      };
      const expectedTarget = {
        body: {
          sourceKey: 'sourceValue',
          extensionList: {
            extension: [
              { key: 'unmappedKey1', value: 'existingValue' }
            ]
          }
        }
      };
      const options = {
        rollUpUnmappedAsExtensions: true,
        mapping
      };
      const result = applyRollUpUnmappedAsExtensions({ source, target, options, logger: mockLogger });
      expect(result).toEqual(expectedTarget);
    });
  });
});
