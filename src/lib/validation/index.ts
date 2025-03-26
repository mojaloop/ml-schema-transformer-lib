import path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { API_NAME, GenericObject } from 'src/types';

const specsCache: GenericObject = {};

export const getApiSpecPath = (apiName: string, version: string): string => {
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

export const validate = (data: GenericObject, spec: { name: string, version: string, path: string }): { errors: string[] } => {
  const errors: string[] = [];
  const apiSpecPath = getApiSpecPath(spec.name, spec.version);
  
  let apiSpec = specsCache[apiSpecPath];
  
  if (!apiSpec) {
    // Do we need this yaml loader?
    // apiSpec = yaml.load(fs.readFileSync(apiSpecPath, 'utf8'));
    apiSpec = fs.readFileSync(apiSpecPath, 'utf8');
    specsCache[apiSpecPath] = apiSpec;
  }



  return { errors };

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

  const validationResult = validate(target, targetSpec);
  if (validationResult.errors.length > 0) {
    logger.error('Target validation failed', { target, validationResult });
    throw new Error('Target validation failed');
  }

  return target;
}