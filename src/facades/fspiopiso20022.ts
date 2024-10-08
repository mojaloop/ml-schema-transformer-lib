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
import { Source, Target, TransformFacadeOptions } from 'src/types';
import { logger as defaultLogger, transformFn } from '../lib';
import { FSPIO20022PMappings } from '../mappings';
import { getProp, setProp } from 'src/lib/utils';

const { discovery, quotes, fxQuotes, transfers, fxTransfers } = FSPIO20022PMappings;

let log = defaultLogger;

/**
 * Facades for transforming FSPIOP ISO 20022 payloads to FSPIOP payloads
 */
export const FspiopIso20022TransformFacade = {
  configure: ({ logger }: { logger: ContextLogger }) => {
    log = logger;
  },
  parties: {
    put: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery.parties.put,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery.parties.putError
      }),
  },
  quotes: {
    post: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> => {
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes.post
      });

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;
      
      // source.body.CdtTrfTxInf.ChrgBr -> target.body.amountType
      setProp(target, 'body.amountType', getProp(source, 'body.CdtTrfTxInf.ChrgBr') === 'DEBT' ? 'RECEIVE' : 'SEND');

      // source.body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf -> target.body.transactionType.refundInfo.reason
      if (getProp(source, 'body.CdtTrfTxInf.InstrForCdtrAgt.Cd') === 'REFD') {
        setProp(target, 'body.transactionType.refundInfo.reason', getProp(source, 'body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf'));
      }

      return target;
    },
    put: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes.put
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes.putError
      }),
  },
  fxQuotes: {
    post: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> => {
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes.post
      });

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;
      
      // source.body.CdtTrfTxInf.ChrgBr -> target.body.amountType
      setProp(target, 'body.amountType', getProp(source, 'body.CdtTrfTxInf.ChrgBr') === 'DEBT' ? 'RECEIVE' : 'SEND');

      return target;
    },
    put: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> => {
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes.put,
        
      });

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;
      
      // source.body.CdtTrfTxInf.ChrgBr -> target.body.amountType
      setProp(target, 'body.amountType', getProp(source, 'body.CdtTrfTxInf.ChrgBr') === 'DEBT' ? 'RECEIVE' : 'SEND');

      return target;
    },
    putError: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes.putError,
      }),
  },
  transfers: {
    post: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.post,
      }),
    patch: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.patch,
      }),
    put: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.put,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.putError,
      }),
  },
  fxTransfers: {
    post: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.post,
      }),
    patch: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.patch,
      }),
    put: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.put,
      }),
    putError: async (source: Source, options: TransformFacadeOptions = {}): Promise<Target> =>
      transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.putError,
      }),
  },
};
