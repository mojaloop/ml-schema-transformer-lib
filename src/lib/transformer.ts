import { ContextLogger } from '@mojaloop/central-services-logger/src/contextLogger';
import { DataMapper, Options, State, TransformDefinition } from 'src/types/map-transform';

class Transformer {
  mapper: DataMapper;
  
  constructor(mapper: DataMapper) {
    this.mapper = mapper;
  }

  async transform(source: unknown, state: State | undefined = undefined): Promise<unknown> {
    return this.mapper(source, state);
  }
}

export type TransformerType = typeof Transformer;

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
