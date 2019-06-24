import fs from 'fs'

const {writeFileSync} = fs

/* eslint-disable node/no-unsupported-features/node-builtins */
const writeFile = fs.promises
  ? fs.promises.writeFile
  : require('util').promisify(fs.writeFile)
/* eslint-enable node/no-unsupported-features/node-builtins */

export {writeFile, writeFileSync}
