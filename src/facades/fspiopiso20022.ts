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
import { FSPIO20022PMappings } from '../mappings';
import { logger as defaultLogger } from '../lib/logger';
import { transformFn } from '../lib/transformer';
import { State } from 'src/types/map-transform';
import { JsonString } from 'src/types';

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
    put: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State } = {}) => transformFn(source, { mapping: overrideMapping || discovery.parties.put, mapperOptions, logger: log }),
    putError: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State } = {}) => transformFn(source, { mapping: overrideMapping || discovery.parties.putError, mapperOptions, logger: log }),
  },
  quotes: {
    post: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State } = {}) => transformFn(source, { mapping: overrideMapping || quotes.post, mapperOptions, logger: log }),
    put: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || quotes.put, mapperOptions, logger: log }),
    putError: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || quotes.putError, mapperOptions, logger: log }),
  },
  fxQuotes: {
    post: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxQuotes.post, mapperOptions, logger: log }),
    put: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxQuotes.put, mapperOptions, logger: log }),
    putError: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxQuotes.putError, mapperOptions, logger: log }),
  },
  transfers: {
    post: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || transfers.post, mapperOptions, logger: log }),
    patch: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || transfers.patch, mapperOptions, logger: log }),
    put: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || transfers.put, mapperOptions, logger: log }),
    putError: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || transfers.putError, mapperOptions, logger: log }),
  },
  fxTransfers: {
    post: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxTransfers.post, mapperOptions, logger: log }),
    patch: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxTransfers.patch, mapperOptions, logger: log }),
    put: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxTransfers.put, mapperOptions, logger: log }),
    putError: async (source: unknown, { overrideMapping, mapperOptions }: { overrideMapping?: JsonString, mapperOptions?: State }  = {}) => transformFn(source, { mapping: overrideMapping || fxTransfers.putError, mapperOptions, logger: log }),
  }
};
 