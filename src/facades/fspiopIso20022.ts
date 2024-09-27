import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { discovery, quotes, transfers } from '../mappings/fspiopiso20022';
import { logger as defaultLogger } from '../lib/logger';
import { transformFn } from '../lib/transformer'
import { OverrideMapping } from 'src/types';

let log = defaultLogger;

/**
 * Facades for transforming FSPIOP ISO 20022 payloads to FSPIOP payloads
 */
export const Fspiop20022TransformFacade = {
  configure: ({ logger }: { logger: ContextLogger }) => {
    log = logger;
  },
  parties: {
    put: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || discovery.parties.put, log),
    putError: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || discovery.parties.putError, log)
  },
  quotes: {
    post: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || quotes.post, log),
    put: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || quotes.put, log),
    putError: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || quotes.putError, log)
  },
  transfers: {
    post: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || transfers.post, log),
    put: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || transfers.put, log),
    putError: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || transfers.putError, log)
  }
}
