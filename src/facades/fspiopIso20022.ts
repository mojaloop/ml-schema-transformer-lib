import { TransformDefinition } from 'src/types/map-transform';
import { createTransformer } from '../lib/transformer';
import { discovery, quotes, transfers } from '../mappings/fspiop_iso20022';

const transform = async (source: unknown, mappingStr: string) => {
  const mapping = JSON.parse(mappingStr) as TransformDefinition;
  const transformer = await createTransformer({ mapping });
  return transformer.transform(source);
}

export const Fspiop20022TransformFacade = {
  discovery: {
    post: async (payload: unknown) => transform(payload, discovery.post),
    putById: async (payload: unknown) => transform(payload, discovery.putById),
    putErrorById: async (payload: unknown) => transform(payload, discovery.putErrorById)
  },
  quotes: {
    post: async (payload: unknown) => transform(payload, quotes.post),
    putById: async (payload: unknown) => transform(payload, quotes.putById),
    putErrorById: async (payload: unknown) => transform(payload, quotes.putErrorById)
  },
  transfers: {
    post: async (payload: unknown) => transform(payload, transfers.post),
    putById: async (payload: unknown) => transform(payload, transfers.putById),
    putErrorById: async (payload: unknown) => transform(payload, transfers.putErrorById)
  }
}