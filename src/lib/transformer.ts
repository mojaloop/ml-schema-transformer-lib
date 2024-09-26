import { DataMapper, Options, State, TransformDefinition } from 'src/types/map-transform';

export const createTransformer = async ({ mapping, options = undefined }: { mapping: TransformDefinition, options?: Options }) => {
  const { default: mapTransform } = await import('map-transform'); // `map-transform` is an ESM-only module, so we need to use dynamic import
  return new Transformer(mapTransform(mapping, options));
}

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