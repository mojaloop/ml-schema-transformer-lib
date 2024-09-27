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
import { discovery, quotes, transfers } from '../mappings/fspiopiso20022';
import { logger as defaultLogger } from '../lib/logger';
import { transformFn } from '../lib/transformer'
import { OverrideMapping } from '../types';

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
