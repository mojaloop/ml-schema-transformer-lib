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

import { ConfigOptions, FspiopTarget, IsoSource, Target, FspiopPutQuotesTarget, FspiopPutPartiesTarget, FspiopPutPartiesErrorTarget, TransformFacadeOptions, TypeGuards, isConfig, PartyIdParamsSource } from '../types';
import { logger as defaultLogger, transformFn } from '../lib';
import { FSPIO20022PMappings } from '../mappings';
import { getProp, setProp } from '../lib/utils';

const { discovery, quotes, fxQuotes, transfers, fxTransfers } = FSPIO20022PMappings;

let log = defaultLogger;

// Facades for transforming FSPIOP ISO 20022 payloads to FSPIOP payloads

export const FspiopIso20022TransformFacade = {
  configure: (config: ConfigOptions) => {
    if (!isConfig(config)) {
      throw new Error('Invalid configuration object for FSPIOP ISO 20022 transform facade');
    }
    log = config.logger;
  },
  parties: {
    put: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopPutPartiesTarget> => {
      if (!TypeGuards.FSPIOPISO20022.parties.put.isSource(source)) {
        throw new Error('Invalid source object for put parties');
      }
      const target = (await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery.parties.put,
      })) as FspiopPutPartiesTarget;

      // split up IdPath
      const IdPath = getProp(target, 'params.IdPath') as string;
      if (IdPath) {
        const [Type, ID, SubId] = IdPath.split('/');
        setProp(target, 'params.Type', Type);
        setProp(target, 'params.ID', ID);
        if (SubId) setProp(target, 'params.SubId', SubId);
        delete (target.params as PartyIdParamsSource).IdPath;
      }

      return target;
    },
    putError: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopPutPartiesErrorTarget> => {
      if (!TypeGuards.FSPIOPISO20022.parties.putError.isSource(source)) {
        throw new Error('Invalid source object for put parties error');
      }
      const target = (await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || discovery.parties.putError
      })) as FspiopPutPartiesErrorTarget;

      // split up IdPath
      const IdPath = getProp(target, 'params.IdPath') as string;
      if (IdPath) {
        const [Type, ID, SubId] = IdPath.split('/');
        setProp(target, 'params.Type', Type);
        setProp(target, 'params.ID', ID);
        if (SubId) setProp(target, 'params.SubId', SubId);
        delete (target.params as PartyIdParamsSource).IdPath;
      }

      return target;
    },
  },
  quotes: {
    post: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.quotes.post.isSource(source)) {
        throw new Error('Invalid source object for post quotes');
      }
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes.post
      }) as FspiopTarget;

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;

      setProp(target, 'body.amountType', getProp(source, 'body.CdtTrfTxInf.ChrgBr') === 'DEBT' ? 'RECEIVE' : 'SEND');

      if (getProp(source, 'body.CdtTrfTxInf.InstrForCdtrAgt.Cd') === 'REFD') {
        setProp(target, 'body.transactionType.refundInfo.reason', getProp(source, 'body.CdtTrfTxInf.InstrForCdtrAgt.InstrInf'));
      }

      if (getProp(source, 'body.CdtTrfTxInf.PmtId.InstrId')) {
        setProp(target, 'body.transactionType.initiator', 'PAYEE');
      } else {
        setProp(target, 'body.transactionType.initiator', 'PAYER');
      }
      
      if (getProp(source, 'body.CdtTrfTxInf.PmtId.InstrId')) {
        if (getProp(source, 'body.CdtTrfTxInf.Cdr.Id.Pty')) {
          setProp(target, 'body.transactionType.initiatorType', 'CONSUMER');
        } else {
          setProp(target, 'body.transactionType.initiatorType', 'BUSINESS');
        }
      } else {
        if (getProp(source, 'body.CdtTrfTxInf.Dtr.Id.Pty')) {
          setProp(target, 'body.transactionType.initiatorType', 'CONSUMER');
        } else {
          setProp(target, 'body.transactionType.initiatorType', 'BUSINESS');
        }
      }

      return target;
    },
    put: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopPutQuotesTarget> => {
      if (!TypeGuards.FSPIOPISO20022.quotes.put.isSource(source)) {
        throw new Error('Invalid source object for put quotes');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes.put
      }) as  Promise<Target>;
    },
    putError: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.quotes.putError.isSource(source)) {
        throw new Error('Invalid source object for put quotes error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || quotes.putError
      }) as Promise<FspiopTarget>;
    },
  },
  transfers: {
    post: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.transfers.post.isSource(source)) {
        throw new Error('Invalid source object for post transfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.post
      }) as Promise<FspiopTarget>;
    },
    patch: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.transfers.patch.isSource(source)) {
        throw new Error('Invalid source object for patch transfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.patch
      }) as Promise<FspiopTarget>;
    },
    put: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.transfers.put.isSource(source)) {
        throw new Error('Invalid source object for put transfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.put
      }) as Promise<FspiopTarget>;
    },
    putError: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.transfers.putError.isSource(source)) {
        throw new Error('Invalid source object for put transfers error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || transfers.putError
      }) as Promise<FspiopTarget>;
    },
  },
  fxQuotes: {
    post: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxQuotes.post.isSource(source)) {
        throw new Error('Invalid source object for post fxQuotes');
      }
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes.post
      }) as FspiopTarget;

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;

      setProp(target, 'body.conversionTerms.amountType', getProp(source, 'body.CdtTrfTxInf.ChrgBr') === 'DEBT' ? 'RECEIVE' : 'SEND');

      return target;
    },
    put: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxQuotes.put.isSource(source)) {
        throw new Error('Invalid source object for put fxQuotes');
      }
      const target = await transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes.put
      }) as FspiopTarget;

      /**
       * Mutate the target object here if necessary e.g complex scenarios that cannot be mapped directly in the mappings, 
       * e.g one-sided mappings, or where the mappings are not sufficient to cover all scenarios.
       * We do not apply these mutations if there is mapping override.
       */
      if (options.overrideMapping) return target;

      setProp(target, 'body.conversionTerms.amountType', getProp(source, 'body.CdtTrfTxInf.ChrgBr') === 'DEBT' ? 'RECEIVE' : 'SEND');

      return target;
    },
    putError: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxQuotes.putError.isSource(source)) {
        throw new Error('Invalid source object for put fxQuotes error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxQuotes.putError
      }) as Promise<FspiopTarget>;
    },
  },
  fxTransfers: {
    post: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxTransfers.post.isSource(source)) {
        throw new Error('Invalid source object for post fxTransfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.post
      }) as Promise<FspiopTarget>;
    },
    patch: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxTransfers.patch.isSource(source)) {
        throw new Error('Invalid source object for patch fxTransfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.patch
      }) as Promise<FspiopTarget>;
    },
    put: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxTransfers.put.isSource(source)) {
        throw new Error('Invalid source object for put fxTransfers');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.put
      }) as Promise<FspiopTarget>;
    },
    putError: async (source: IsoSource, options: TransformFacadeOptions = {}): Promise<FspiopTarget> => {
      if (!TypeGuards.FSPIOPISO20022.fxTransfers.putError.isSource(source)) {
        throw new Error('Invalid source object for put fxTransfers error');
      }
      return transformFn(source, {
        ...options,
        logger: log,
        mapping: options.overrideMapping || fxTransfers.putError
      }) as Promise<FspiopTarget>;
    }
  },
};
