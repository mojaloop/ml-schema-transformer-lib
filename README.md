# ML Schema Transformer (MLST)

[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/ml-schema-transformer-lib.svg?style=flat)](https://github.com/mojaloop/ml-schema-transformer-lib/commits/master)
[![Git Releases](https://img.shields.io/github/release/mojaloop/ml-schema-transformer-lib.svg?style=flat)](https://github.com/mojaloop/ml-schema-transformer-lib/releases)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/ml-schema-transformer-lib.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/ml-schema-transformer-lib)
[![CircleCI](https://circleci.com/gh/mojaloop/ml-schema-transformer-lib.svg?style=svg)](https://circleci.com/gh/mojaloop/ml-schema-transformer-lib)

A shared component for transforming mojaloop payloads from one schema to another.

## Contributing

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to contribute, committing changes, releases and snapshots.

## Getting Started

### Installing

```
npm i @mojaloop/ml-schema-transformer-lib
```

### Usage

MLST can be used via the exported facades or the creator function.

**Facades**

```
// ESM
import { TransformFacades } from '@mojaloop/ml-schema-transformer-lib';
// CJS
const { TransformFacades } = require('@mojaloop/ml-schema-transformer-lib')

// source is an FSPIOP POST /quotes payload 
const source = {
  quoteId: 'random quote id',
  ...
};
// target is an FSPIOP ISO 20022 Post /quotes payload
const target = await TransformFacades.FSPIOP.quotes.post(source);
```
The facade functions work with built-in mappings which are located in `src/mappings` directory.
The facade functions take optional second parameter of type `TransformFacadeOptions` for controlling certain aspects of the function.

For example:
 - To override the mapping used in the function, pass in `{ overrideMapping: 'your mapping JSOn string' }`
 - To pass in additional options for the instantiation of [MapTransform](https://github.com/integreat-io/map-transform) (the underlying transformation library), pass in `{ mapTransformOptions: { ...additionalMapTransformOptions } }`.
 - To pass in additional options for the MapTransform mapper call, pass in `{ mapperOptions: { ...additionalMapperOptions } }`

**Creator Function**

```
// ESM
import { createTransformer } from ' @mojaloop/ml-schema-transformer-lib';
// CJS
const { createTransformer } = require('@mojaloop/ml-schema-transformer-lib')

const mapping = { "quoteId": "CdtTrfTxInf.PmtId.TxId", ... }

const transformer = await createTransformer(mapping);
const transformer = createTransformer(mapping)

const source = { quoteId: 'random quote id', ... };
const target = transformer.transform(source);
```

The `createTransform` function takes an optional second parameter of type `CreateTransformerOptions` for controlling the instantiation of the `MapTransform` object.

For example:
- To pass in additional options for the instantiation of `MapTransform`, pass in { mapTransformOptions: { ...additionalMapTransformOptions } } 

### Custom Transform Functions

Custom transform functions are special functions which are embedded in field mappings and are executed during transformation of those fields. 
To provide custom transform functions (for both Facades and `createTransformer` use cases):

```
  const fn1 = (options) => () => (data, state) => {
    const modified = // apply custom transformation to `data`;
    return modified;
  }
  const fn2 = (options) => () => (data, state) => {
    const modified = // apply custom transformation to `data`;
    return modified;
  }
  const options = { 
    mapTransformOptions: {
      transformers: {  
        fn1,
        fn2,
        ...
      }
    } 
  }
```

Replace `fn1` and `fn2` with the actual names of your functions. See `src/lib/transforms/index.ts` or [here](https://github.com/integreat-io/map-transform?tab=readme-ov-file#operations) for more on authoring and using custom transform functions in mappings.

## Development

### Install Depednencies

```
npm i
```

### Run Tests
```
npm test
```

### Build
```
npm run build
```





