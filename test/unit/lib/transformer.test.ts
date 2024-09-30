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

import { createTransformer, transformFn, Transformer } from '../../../src/lib/transformer';
import { mockLogger } from 'test/fixtures';

describe.skip('Transformer tests', () => {
  describe('createTransformer', () => {
    test('should create a new Transformer instance', async () => {
      const mapping = {
        source: {
          party: 'partyIdInfo.partyIdType',
        },
        target: {
          partyIdType: 'party.partyIdInfo.partyIdType',
        },
      };
      const transformer = await createTransformer(mapping);
      expect(transformer).toBeInstanceOf(Transformer);
    });
  })

  describe('transformFn', () => {
    test('should transform source payload using supplied mapping', async () => {
      const source = {
        party: 'MSISDN',
      };
      const mapping = JSON.stringify({
        source: {
          party: 'partyIdInfo.partyIdType',
        },
        target: {
          partyIdType: 'party.partyIdInfo.partyIdType',
        },
      });
      const target = await transformFn(source, { mapping, logger: mockLogger });
      expect(target).toEqual({
        party: {
          partyIdInfo: {
            partyIdType: 'MSISDN',
          },
        },
      });
    });

    test('should throw an error if transformation fails', async () => {
      const source = {
        party: 'MSISDN',
      };
      const mapping = JSON.stringify({
        source: {
          party: 'partyIdInfo.partyIdType',
        },
        target: {
          partyIdType: 'party.partyIdInfo.partyIdType',
        },
      });
      try {
        await transformFn(source, { mapping: 'invalid mapping', logger: mockLogger });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('Transformer', () => {
    describe('transform', () => {
      test('should transform source payload using supplied mapping', async () => {
        const { default: mapTransform } = await import('map-transform'); // `map-transform` is an ESM-only module, so we need to use dynamic import
        const mapping = {
          source: {
            party: 'partyIdInfo.partyIdType',
          },
          target: {
            partyIdType: 'party.partyIdInfo.partyIdType',
          },
        };
        const transformer = new Transformer(mapTransform(mapping));
        const source = {
          party: 'MSISDN',
        };
        const target = await transformer.transform(source);
        expect(target).toEqual({
          party: {
            partyIdInfo: {
              partyIdType: 'MSISDN',
            },
          },
        });
      });
    });
  });
});