import { GenericObject } from '../../types';

export const applyAfterTransformSteps = (source: GenericObject,  target: GenericObject, options: GenericObject): GenericObject => {
  for (const step of options.afterTransformSteps) {
    target = step({ source, target, options, logger: options.logger }) as GenericObject;
  }
  return target;
};