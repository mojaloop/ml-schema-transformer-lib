'use strict'
/**
 * standard-version `postchangelog` hook.
 *
 * Rewrites generated CHANGELOG.md issue links from the per-repo URL to the
 * canonical mojaloop/project issue tracker, e.g.
 *   [mojaloop/#123](https://github.com/mojaloop/<repo>/issues/123)
 *   -> [mojaloop/#123](https://github.com/mojaloop/project/issues/123)
 *
 * Replaces the previous `replace` npm package, which pulled a ReDoS-vulnerable
 * minimatch (and was incompatible with the pinned minimatch v10). Uses only
 * Node's built-in regex — no dependencies.
 */

const fs = require('node:fs')

const file = 'CHANGELOG.md'
const updated = fs.readFileSync(file, 'utf8').replace(
  /\[mojaloop\/#(\d+)\]\(https:\/\/github\.com\/mojaloop\/(.*)\/issues\/(\d+)\)/g,
  '[mojaloop/#$1](https://github.com/mojaloop/project/issues/$1)'
)
fs.writeFileSync(file, updated)
