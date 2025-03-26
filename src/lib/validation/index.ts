/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>
 
 * Steven Oderayi <steven.oderayi@infitx.com>
 --------------
 ******/

import path from 'path';
import NodeCache from 'node-cache';
import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { API_NAME, GenericObject, HTTP_METHOD } from 'src/types';
import { Validator } from './validator';

const validatorsCache = new NodeCache();

export const getApiSpecPath = (apiName: API_NAME, version: string): string => {
  let specFile: string;

  switch (apiName) {
    case API_NAME.FSPIOP:
      specFile = `../docs/fspiop-rest-v${version}-openapi3-snippets.yaml`;
      break;
    case API_NAME.ISO20022:
      specFile = `../docs/fspiop-rest-v${version}-ISO20022-openapi3-snippets.yaml`;
      break;
    default:
      throw new Error(`Invalid API name: ${apiName} in getApiSpecPath`);
  }

  const specPath = path.join(path.dirname(require.resolve('@mojaloop/api-snippets')), specFile);
  return specPath;
}

/**
 * Returns true or throws if the target object fails validation against the API spec
 */
export const validateBody = async (body: GenericObject, spec: { name: API_NAME, version: string, path: string, method: HTTP_METHOD }): Promise<boolean> => {
  const apiSpecPath = getApiSpecPath(spec.name, spec.version);

  let validator: Validator = validatorsCache.get(apiSpecPath) as Validator;
  if (!validator) {
    validator = new Validator(apiSpecPath);
    await validator.initialize();
    validatorsCache.set(apiSpecPath, validator);
  }

  return validator.validateBody({ body, path: spec.path, method: spec.method }) as boolean;
}
 
export const applyTargetValidation = async (params: { source: GenericObject, target: GenericObject, options: GenericObject, logger: ContextLogger }) => {
  const { target, options, logger } = params;

  if (!options.validateTarget) {
    logger.debug('Skipping target validation', { target, options });
    return target;
  }

  const targetSpec = options.applyTargetValidation?.targetSpec;
  if (!targetSpec || !targetSpec.name || !targetSpec.path || !targetSpec.method) {
    logger.error('Missing or invalid targetSpec in applyTargetValidation options', { target, targetSpec });
    throw new Error('Missing or invalid targetSpec in applyTargetValidation options');
  }

  await validateBody(target.body, targetSpec);

  return target;
}
