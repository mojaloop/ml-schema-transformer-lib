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
  body: {
    quoteId: 'random quote id',
    ...,
  },
  headers: { ... },
  params: { ... }
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

const source = { body: { quoteId: 'random quote id', ... }, ... };
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

## Known Issues

A note on using `ml-schema-transformer-lib` (MLST) in CJS projects

If you're seeing any of the following errors while running tests with Jest

1. `You need to run with a version of node that supports ES Modules in the VM API. See https://jestjs.io/docs/ecmascript-modules` or
2. ` TypeError: A dynamic import callback was invoked without --experimental-vm-modules`

**Workarounds**

To resolve (1), upgrade to latest Node LTS (v20.17.0)
To resolve (2), update your test command to pass in the `--experimental-vm-modules` NODE_OPTION e.g NODE_OPTIONS='--experimental-vm-modules' npx jest

**The why?**

This is happening due to an open bug in Jest (https://github.com/jestjs/jest/issues/9430). Basically, Jest uses experimental features for its ESM-related support
like dynamic imports etc.

MLST uses `MapTransform`, an ES-only module, as its underlying schema transformer. The only way to import `MapTransform` into MLST is via dynamic import.

In developing MLST, Jest had to be replaced with Vitest (https://vitest.dev/) due to this bug. Vitest supports modern ESM features out-of-the-box, it's fast (maybe faster) and has API compatibility with Jest (shallow learning curve).

**Long Term Solutions**

1. Enable CJS compatibility in `MapTransform`
  I have an open PR (https://github.com/integreat-io/map-transform/pull/133) on `MapTransform` to support CJS distribution. We do not have control over this if the PR is not accepted. CJS is now regarded as the past in favour of ESM. So this might not happen.
  We may also fork `MapTransform`, update and publish in npm under mojaloop with CJS support (if the license of `MapTransform` supports this)
2. Replace `MapTransform` with a CJS compatible library with similar features. I am yet to find such library. Please recommend if you find one.









