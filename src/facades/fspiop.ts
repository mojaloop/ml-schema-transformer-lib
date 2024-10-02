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

import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { State } from 'src/types/map-transform';
import { logger as defaultLogger, transformFn } from '../lib';
import { FSPIO20022PMappings, FSPIOPMappings } from '../mappings';
import { GenericObject, Source, Target, TransformFacadeOptions } from '../types';

const { quotes, fxQuotes, transfers, fxTransfers } = FSPIO20022PMappings;
const { discovery } = FSPIOPMappings;

let log: ContextLogger = defaultLogger;

/**
 * Facades for transforming FSPIOP payloads to FSPIOP ISO 20022 payloads
 */
export const FspiopTransformFacade = {
  configure: ({ logger }: { logger: ContextLogger }) => {
    log = logger;
  },
  parties: {
    put: async (source: Source & { headers: GenericObject, params: GenericObject }, options: TransformFacadeOptions = {}): Promise<Target>  => {
      const target = await transformFn(source, {
        mapping: options.overrideMapping || discovery.parties.put,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions } as State,
        logger: log,
      }) as Target;

      /**
       * Mutate the target object here if necessary e.g scenarios that cannot be mapped with the mapping,
       * fields that are undefined in one schema but required in the other
       */
     

      return target;
    },
    putError: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || discovery.parties.putError,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions } as State,
        logger: log,
      }),
  },
  quotes: {
    post: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || quotes.post,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    put: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || quotes.put,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || quotes.putError,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
  },
  fxQuotes: {
    post: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxQuotes.post,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    put: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxQuotes.put,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxQuotes.putError,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
  },
  transfers: {
    post: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || transfers.post,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    patch: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || transfers.patch,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    put: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || transfers.put,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || transfers.putError,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
  },
  fxTransfers: {
    post: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxTransfers.post,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    patch: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxTransfers.patch,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    put: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxTransfers.put,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}) =>
      transformFn(source, {
        mapping: options.overrideMapping || fxTransfers.putError,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      }),
  },
};
