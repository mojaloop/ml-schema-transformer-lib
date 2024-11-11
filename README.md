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

// `source` is an object with `body` property containing FSPIOP POST /quotes payload
const source = {
  body: {
    quoteId: 'random quote id',
    ...,
  }
};
// `target` is an object with `body` property containing  transformed FSPIOP ISO 20022 POST /quotes payload
const target = await TransformFacades.FSPIOP.quotes.post(source);
```
The `source` parameter may require `params` and/or `headers` properties depending on the use-case.
`target` will always be `{ body }` for ISO targets and `{ body, headers?, params? }` for FSPIOP targets. The optional FSPIOP target `headers` and `params` will be populated as needed on use-case basis.
Be sure to check the signature for the facade function you're using to be sure of what is expected as parameter and result.
The facade functions have type guards that validate the `source` parameter to ensure they are of the right shape. The type guards will throw exceptions when the `source` parameter passed are not in the shape expected.
The facade functions work with built-in mappings which are located in `src/mappings` directory.
The facade functions take optional second parameter of type `TransformFacadeOptions` for controlling certain aspects of the function.

For example:
 - To override the mapping used in the function, pass in `{ overrideMapping: 'your mapping JSON string' }`
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

### Extension List Support
**MLST** supports rolling up and unrolling FSPIOP extension lists as follows:
	- ***Extension list unrolling***: Converts extension lists from FSPIOP sources to properties in ISO 20022 targets.
	- ***Extension list roll-up***: Converts unmapped properties in ISO sources to an extension list in FSPIOP targets.

This feature can be enabled via facade configuration, for example:

```JavaScript
FspiopTransformFacade.configure({ unrollExtensions: true })
FspiopIso20022TransformFacade.configure({ rollUpUnmappedAsExtensions: true })
```

Alternatively, the feature can be activated through specific endpoints, for example:

```JavaScript
FspiopTransformFacade.quotes.post(source, { unrollExtensions: true })
FspiopIso20022TransformFacade.quotes.post(source, { rollUpUnmappedAsExtensions: true })
```

***Note***: `unrollExtensions` is supported only in `FspiopTransformFacade`, while `rollUpUnmappedAsExtensions` is supported only in `FspiopIso20022TransformFacade`.

### Environment Variables
| Env Variable Name           | Default Value | Description                                          |
|-----------------------------|---------------|------------------------------------------------------|
| MLST_LOG_LEVEL              | `warn`        | The log level for MLST                               |
| MLST_ILP_VERSION            | `v4`          | ILP version used for `ilpPacketToCondition` transform. <br />**Note**:  ILP v1 is not supported|
| MLST_TESTING_MODE           | false         | When `true`, some mapping contains defaults that don't need context from past requests. Useful for one off request transformations.

## Performance

Hardware   →   Apple M3 Max, 14 Cores, 36 GB RAM

| Use Case                                        | No. of Iterations | Duration       |
|-------------------------------------------------|-------------------|----------------|
| POST /quotes transformation { FSPIOP → ISO }    | 1000              | ~301ms         |
| POST /quotes transformation { ISO → FSPIOP }    | 1000              |~205ms          |
| POST /transfers transformation { FSPIOP → ISO } | 1000              | ~135ms         |
| POST /transfers transformation { ISO → FSPIOP } | 1000              | ~79ms          |

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
