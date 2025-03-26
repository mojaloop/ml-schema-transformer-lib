import path from 'path';
import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { API_NAME, GenericObject, HTTP_METHOD } from 'src/types';
import { Validator } from './validator';

const specsCache: GenericObject = {};
const validatorsCache: GenericObject = {};

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
export const validateTarget = (target: GenericObject, spec: { name: API_NAME, version: string, path: string, method: HTTP_METHOD }): boolean => {
  const apiSpecPath = getApiSpecPath(spec.name, spec.version);

  let validator: Validator = validatorsCache[apiSpecPath];
  if (!validator) {
    validator = new Validator(apiSpecPath);
    validatorsCache[apiSpecPath] = validator;
  }

  return validator.validateBody({ body: target, path: spec.path, method: spec.method }) as boolean;
}

export const applyTargetValidation = (params: { source: GenericObject, target: GenericObject, options: GenericObject, logger: ContextLogger }) => {
  const { target, options, logger } = params;

  if (!options.validateTarget) {
    logger.debug('Skipping target validation', { target, options });
    return target;
  }

  const targetSpec = options.applyTargetValidation?.targetSpec;
  if (!targetSpec || !targetSpec.name || !targetSpec.path) {
    logger.error('Missing or invalid targetSpec in applyTargetValidation options', { target, targetSpec });
    throw new Error('Missing or invalid targetSpec in applyTargetValidation options');
  }

  validateTarget(target, targetSpec);

  return target;
}
