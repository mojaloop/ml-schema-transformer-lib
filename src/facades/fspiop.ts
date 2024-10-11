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
import { logger as defaultLogger, transformFn } from '../lib';
import { FSPIO20022PMappings } from '../mappings';
import { FspiopSource, GenericObject, IsoTarget, Source, TransformFacadeOptions } from '../types';
import { getProp, setProp } from '../lib/utils';
import { fxTransfers_reverse } from '../mappings/fspiopiso20022';

const { discovery_reverse, quotes_reverse, transfers_reverse, fxQuotes_reverse } = FSPIO20022PMappings;

let log: ContextLogger = defaultLogger;

/**
 * Facades for transforming FSPIOP payloads to FSPIOP ISO 20022 payloads
 */
export const FspiopTransformFacade = {
  configure: ({ logger }: { logger: ContextLogger }) => {
    log = logger;
  },
  parties: {
    put: async (source: Source & { headers: GenericObject }, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery_reverse.parties.put,
      }) as Promise<IsoTarget>,
    putError: async (source: Source & { headers: GenericObject }, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery_reverse.parties.putError,
      }) as Promise<IsoTarget>,
  },
  quotes: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes_reverse.post
      }) as IsoTarget;

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;

      setProp(target, 'body.CdtTrfTxInf.ChrgBr', getProp(source, 'body.amountType') === 'SEND' ? 'CRED' : 'DEBT');
      
      if (getProp(source, 'body.transactionType.refundInfo')) {
        setProp(target, 'body.CdtTrfTxInf.InstrForCdtrAgt.Cd', 'REFD');
        setProp(target, 'body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf', getProp(source, 'body.transactionType.refundInfo.reason'));
      }

      return target;
    },
    put: async (source: FspiopSource & { $context?: { isoPostQuote: GenericObject } }, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes_reverse.put
      }) as Promise<IsoTarget>,
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes_reverse.putError,
      }) as Promise<IsoTarget>,
  },
  transfers: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.post
      }) as Promise<IsoTarget>,
    patch: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.patch
      }) as Promise<IsoTarget>,
    put: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.put
      }) as Promise<IsoTarget>,
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.putError
      }) as Promise<IsoTarget>,
  },
  fxQuotes: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes_reverse.post
      }) as IsoTarget;

      /**
      * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
      * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
      * We do not apply these mutations if there is mapping override.
      */
      if (options.overrideMapping) return target;

      setProp(target, 'body.CdtTrfTxInf.ChrgBr', getProp(source, 'body.amountType') === 'SEND' ? 'CRED' : 'DEBT');

      return target;
    },
    put: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes_reverse.put
      }) as IsoTarget;

      /**
      * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
      * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
      * We do not apply these mutations if there is mapping override.
      */
      if (options.overrideMapping) return target;

      setProp(target, 'body.CdtTrfTxInf.ChrgBr', getProp(source, 'body.amountType') === 'SEND' ? 'CRED' : 'DEBT');

      return target;
    },
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes_reverse.putError
      }) as Promise<IsoTarget>,
  },
  fxTransfers: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.post
      }) as Promise<IsoTarget>,
    patch: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.patch
      }) as Promise<IsoTarget>,
    put: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.put
      }) as Promise<IsoTarget>,
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.putError
      }) as Promise<IsoTarget>,
  },
};
