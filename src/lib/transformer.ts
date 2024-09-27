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
import { DataMapper, Options, State, TransformDefinition } from '../types/map-transform';
import { ITransformer } from '../types';

export const createTransformer = async ({ mapping, options = undefined }: { mapping: TransformDefinition, options?: Options }) => {
  const { default: mapTransform } = await import('map-transform'); // `map-transform` is an ESM-only module, so we need to use dynamic import
  return new Transformer(mapTransform(mapping, options));
}

export const transformFn = async (source: unknown, mappingStr: string, logger: ContextLogger) => {
  try {
    const mapping = JSON.parse(mappingStr) as TransformDefinition;
    const transformer = await createTransformer({ mapping });
    return transformer.transform(source);
  } catch (error) {
    logger.error('Error transforming payload with supplied mapping', { error, source, mappingStr });
    throw error;
  }
}

class Transformer implements ITransformer {
  mapper: DataMapper;
  
  constructor(mapper: DataMapper) {
    this.mapper = mapper;
  }

  async transform(source: unknown, state: State | undefined = undefined): Promise<unknown> {
    return this.mapper(source, state);
  }
}
