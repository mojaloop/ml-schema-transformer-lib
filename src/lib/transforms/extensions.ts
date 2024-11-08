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
import { GenericObject } from '../../types';
import { deepMerge, unrollExtensions, rollupUnmappedIntoExtensions, setProp, deduplicateObjectsArray } from '../utils';
import { TransformDefinition } from '../../types/map-transform';

// Unrolls extensions from the source object and merges them with the target object
export const applyUnrollExtensions = (params: { source: GenericObject, target: GenericObject, options: GenericObject, logger: ContextLogger }) => {
  const { source, target, options, logger } = params;
  if (!options.unrollExtensions || !source.body.extensionList?.extensions) {
    logger.debug('Skipping unrollExtensions', { source, target, options });
    return target;
  }
  const unrolled = unrollExtensions(source.body.extensionList.extensions);
  logger.debug('Unrolled extensions', { source, unrolled });
  return deepMerge(target, unrolled);
}

// Rolls up unmapped properties from the source object into extensions and adds them to the target object's extensionList
export const applyRollupUnmappedIntoExtensions = (params: { source: GenericObject, target: GenericObject, mapping: TransformDefinition, options: GenericObject, logger: ContextLogger }) => {
  const { source, target, mapping, options, logger } = params;
  if (!options.rollupUnmappedIntoExtensions) {
    logger.debug('Skipping rollupUnmappedIntoExtensions', { source, target, mapping, options });
    return target;
  }
  const extensions = rollupUnmappedIntoExtensions(source, mapping);
  logger.debug('Rolled up extensions', { source, mapping, extensions });

  if (extensions.length === 0) return target;

  if (!target.body.extensionList?.extension) {
    setProp(target, 'body.extensionList.extension', []);
  }
  target.body.extensionList.extension.push(...extensions);
  target.body.extensionList.extensions = deduplicateObjectsArray(target.body.extensionList.extensions, 'key');

  return target;
}
