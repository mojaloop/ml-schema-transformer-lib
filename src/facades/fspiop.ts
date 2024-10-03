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
import { FSPIO20022PMappings } from '../mappings';
import { GenericObject, Source, Target, TransformFacadeOptions } from '../types';
import { getProp, setProp } from 'src/lib/utils';
import { quotes_reverse } from 'src/mappings/fspiopiso20022';

const { discovery_reverse, quotes, fxQuotes, transfers, fxTransfers } = FSPIO20022PMappings;

let log: ContextLogger = defaultLogger;

/**
 * Facades for transforming FSPIOP payloads to FSPIOP ISO 20022 payloads
 */
export const FspiopTransformFacade = {
  configure: ({ logger }: { logger: ContextLogger }) => {
    log = logger;
  },
  parties: {
    put: async (source: Source & { headers: GenericObject }, options: TransformFacadeOptions = {}): Promise<Target> => 
      transformFn(source, {
        mapping: options.overrideMapping || discovery_reverse.parties.put,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions } as State,
        logger: log,
      }),
    putError: async (source: Source & { headers: GenericObject }, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        mapping: options.overrideMapping || discovery_reverse.parties.putError,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions } as State,
        logger: log,
      }),
  },
  quotes: {
    post: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> => {
      const target = await transformFn(source, {
        mapping: options.overrideMapping || quotes_reverse.post,
        mapTransformOptions: options.mapTransformOptions,
        mapperOptions: { ...options.mapperOptions, rev: true } as State,
        logger: log,
      });

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       */

      // source.body.amountType -> target.body.CdtTrfTxInf.ChrgBr 
      setProp(target, 'body.CdtTrfTxInf.ChrgBr', getProp(source, 'body.amountType') === 'SEND' ? 'CRED' : 'DEBT');

      // source.body.transactionType.refundInfo -> target.body.CdtTrfTxInf.InstrForCdtrAgt.Cd
      // source.body.transactionType.refundInfo.reason -> target.body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf
      if (getProp(source, 'body.transactionType.refundInfo')) {
        setProp(target, 'body.CdtTrfTxInf.InstrForCdtrAgt.Cd','REFD');
        setProp(target, 'body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf', getProp(source, 'body.transactionType.refundInfo.reason'));
      }

      return target;
    },
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
