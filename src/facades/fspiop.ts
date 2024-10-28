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
import { getProp, setProp } from '../lib/utils';
import { FSPIO20022PMappings } from '../mappings';
import { fxTransfers_reverse } from '../mappings/fspiopiso20022';
import {
  ConfigOptions,
  FspiopPutPartiesErrorSource,
  FspiopPutPartiesSource,
  FspiopPutQuotesSource,
  FspiopSource,
  FspiopPostTransfersSource,
  IsoTarget,
  TransformFacadeOptions,
  TypeGuards,
  isConfig
} from '../types';

const { discovery_reverse, quotes_reverse, transfers_reverse, fxQuotes_reverse } = FSPIO20022PMappings;

let log: ContextLogger = defaultLogger;
let isTestingMode: boolean | undefined = false;

// Facades for transforming FSPIOP payloads to FSPIOP ISO 20022 payloads

export const FspiopTransformFacade = {
  configure: (config: ConfigOptions) => {
    if (!isConfig(config)) {
      throw new Error('Invalid configuration object for FSPIOP transform facade');
    }
    log = config.logger;
    isTestingMode = config.isTestingMode;
  },
  parties: {
    put: async (source: FspiopPutPartiesSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.parties.put.isSource(source)) {
        throw new Error('Invalid source object for put parties');
      }
      // construct source.params.IdPath if not present
      if (!source.params.IdPath) {
        source.params.IdPath = `${source.params.Type}/${source.params.ID}`;
        if (source.params.SubId) {
          source.params.IdPath += `/${source.params.SubId}`;
        }
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery_reverse.parties.put,
      }) as Promise<IsoTarget>;
    },
    putError: async (source: FspiopPutPartiesErrorSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.parties.putError.isSource(source)) {
        throw new Error('Invalid source object for put parties error');
      }
      // construct source.params.IdPath if not present
      if (!source.params.IdPath) {
        source.params.IdPath = `${source.params.Type}/${source.params.ID}`;
        if (source.params.SubId) {
          source.params.IdPath += `/${source.params.SubId}`;
        }
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery_reverse.parties.putError,
      }) as Promise<IsoTarget>;
    },
  },
  quotes: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.quotes.post.isSource(source)) {
        throw new Error('Invalid source object for post quotes');
      }
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
    put: async (source: FspiopPutQuotesSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.quotes.put.isSource(source)) {
        throw new Error('Invalid source object for put quotes');
      }
      if (!isTestingMode && !source.$context) {
        throw new Error('Invalid source object for put quotes, missing $context');
      }
      const defaultMapSelection = isTestingMode ? quotes_reverse.putTesting : quotes_reverse.put;
      const mapping = options.overrideMapping || defaultMapSelection;
      return transformFn(source, {
        ...options,
        logger: log,
        mapping,
      }) as Promise<IsoTarget>;
    },
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.quotes.putError.isSource(source)) {
        throw new Error('Invalid source object for put quotes error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes_reverse.putError,
      }) as Promise<IsoTarget>;
    },
  },
  transfers: {
    post: async (source: FspiopPostTransfersSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.transfers.post.isSource(source)) {
        throw new Error('Invalid source object for post transfers');
      }
      if (!isTestingMode && !source.$context) {
        throw new Error('Invalid source object for post transfers, missing $context');
      }
      const defaultMapSelection = isTestingMode ? transfers_reverse.postTesting : transfers_reverse.post;
      const mapping = options.overrideMapping || defaultMapSelection;
      return transformFn(source, {
        ...options,
        logger: log,
        mapping,
      }) as Promise<IsoTarget>;
    },
    patch: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.transfers.patch.isSource(source)) {
        throw new Error('Invalid source object for patch transfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.patch
      }) as Promise<IsoTarget>;
    },
    put: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.transfers.put.isSource(source)) {
        throw new Error('Invalid source object for put transfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.put
      }) as Promise<IsoTarget>;
    },
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.transfers.putError.isSource(source)) {
        throw new Error('Invalid source object for put transfers error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers_reverse.putError
      }) as Promise<IsoTarget>;
    },
  },
  fxQuotes: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxQuotes.post.isSource(source)) {
        throw new Error('Invalid source object for post fxQuotes');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes_reverse.post
      }) as Promise<IsoTarget>;
    },
    put: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxQuotes.put.isSource(source)) {
        throw new Error('Invalid source object for put fxQuotes');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes_reverse.put
      }) as Promise<IsoTarget>;
    },
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxQuotes.putError.isSource(source)) {
        throw new Error('Invalid source object for put fxQuotes error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes_reverse.putError
      }) as Promise<IsoTarget>;
    },
  },
  fxTransfers: {
    post: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxTransfers.post.isSource(source)) {
        throw new Error('Invalid source object for post fxTransfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.post
      }) as Promise<IsoTarget>;
    },
    patch: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxTransfers.patch.isSource(source)) {
        throw new Error('Invalid source object for patch fxTransfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.patch
      }) as Promise<IsoTarget>;
    },
    put: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxTransfers.put.isSource(source)) {
        throw new Error('Invalid source object for put fxTransfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.put
      }) as Promise<IsoTarget>;
    },
    putError: async (source: FspiopSource, options: TransformFacadeOptions = {}): Promise<IsoTarget> => {
      if (!TypeGuards.FSPIOP.fxTransfers.putError.isSource(source)) {
        throw new Error('Invalid source object for put fxTransfers error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers_reverse.putError
      }) as Promise<IsoTarget>;
    },
  },
};
