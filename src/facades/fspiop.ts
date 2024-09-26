import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { discovery, quotes, transfers } from '../mappings/fspiop';
import { OverrideMapping } from 'src/types';
import { logger as defaultLogger } from '../lib/logger';
import { transformFn } from '../lib/transformer'

let log = defaultLogger;

/**
 * Facades for transforming FSPIOP payloads to FSPIOP 20022 payloads
 */
export const FspiopTransformFacade = {
  configure: ({ logger }: { logger: ContextLogger }) => {
    log = logger;
  },
  discovery: {
    post: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || discovery.post, log),
    putById: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || discovery.putById, log),
    putErrorById: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || discovery.putErrorById, log)
  },
  quotes: {
    post: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || quotes.post, log),
    putById: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || quotes.putById, log),
    putErrorById: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || quotes.putErrorById, log)
  },
  transfers: {
    post: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || transfers.post, log),
    putById: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || transfers.putById, log),
    putErrorById: async (payload: unknown, mapping: OverrideMapping = undefined) => transformFn(payload, mapping || transfers.putErrorById, log)
  }
}