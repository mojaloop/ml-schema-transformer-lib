/*****
 License
 --------------
 Copyright © 2020-2024 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not 
 use these files except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES 
 OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 
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
import { deepMerge, unrollExtensions, rollUpUnmappedAsExtensions, setProp, deduplicateObjectsArray, getProp } from '../utils';
import { get } from 'http';

// Unrolls extensions from the source object and merges them with the target object
export const applyUnrollExtensions = (params: { source: GenericObject, target: GenericObject, options: GenericObject, logger: ContextLogger }) => {
  const { source, target, options, logger } = params;
  let extensionListProperty; 
  // determine the property path to the extension list
  if (options.applyUnrollExtensions?.extensionListProperty) {
    extensionListProperty = options.applyUnrollExtensions?.extensionListProperty;
  } else if (source.body?.errorInformation) {
    extensionListProperty = 'body.errorInformation.extensionList';
  } else {
    extensionListProperty = 'body.extensionList';
  }
  const extension = getProp(source, `${extensionListProperty}.extension`);
  if (!options.unrollExtensions || !extension) {
    logger.debug('Skipping unrollExtensions', { source, target, options });
    return target;
  }
  
  const unrolled = unrollExtensions(extension as any);
  logger.debug('Unrolled extensions', { source, unrolled });
  // we merge the unrolled extensions into the target's body only
  target.body = deepMerge(target.body, unrolled);
  return target;
}

// Rolls up unmapped properties from the source object into extensions and adds them to the target object's extensionList
export const applyRollUpUnmappedAsExtensions = (params: { source: GenericObject, target: GenericObject, options: GenericObject, logger: ContextLogger }) => {
  const { source, target, options: { mapping },  options, logger } = params;
  if (!options.rollUpUnmappedAsExtensions) {
    logger.debug('Skipping rollUpUnmappedAsExtensions', { source, target, mapping, options });
    return target;
  }
  const extensions = rollUpUnmappedAsExtensions(source, mapping);
  logger.debug('Rolled up unmapped properties into extensions', { source, mapping, extensions });

  if (extensions.length === 0) {
    logger.debug('No unmapped properties to roll up', { source, mapping });
    return target;
  }

  if (!target.body.extensionList?.extension) {
    setProp(target, 'body.extensionList.extension', []);
  }
  target.body.extensionList.extension.push(...extensions);
  target.body.extensionList.extension = deduplicateObjectsArray(target.body.extensionList.extension, 'key');
  logger.debug('Rolled up unmapped properties into extensions', { source, target, mapping, extensions });

  return target;
}
