import path from 'path'
import fsModule from 'fs'
import format from 'prettier-format'
import pify from 'pify'

// TODO [engine>=10]: use fs.promises
const fs = {
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  mkdir: (fsModule.promises && fsModule.promises.mkdir) || pify(fsModule.mkdir),
  writeFile:
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    (fsModule.promises && fsModule.promises.writeFile) ||
    pify(fsModule.writeFile),
  mkdirSync: fsModule.mkdirSync,
  writeFileSync: fsModule.writeFileSync,
}

const defaultOptions = {
  resolveConfig: true,
}

async function writeFile(file, data, options) {
  await fs.mkdir(path.dirname(file), {recursive: true})
  return fs.writeFile(file, data, options)
}

function writeFileSync(file, data, options) {
  fs.mkdirSync(path.dirname(file), {recursive: true})
  return fs.writeFileSync(file, data, options)
}

async function writePrettierFile(file, data, options = {}) {
  options = {
    filePath: file,
    ...defaultOptions,
    ...options,
  }

  if (!options.resolveConfig) {
    delete options.filePath
  }

  const formatted = await format(data, options)
  return writeFile(file, formatted, options)
}

function writePrettierFileSync(file, data, options) {
  options = {
    filePath: file,
    ...defaultOptions,
    ...options,
  }

  if (!options.resolveConfig) {
    delete options.filePath
  }

  const formatted = format.sync(data, options)
  return writeFileSync(file, formatted, options)
}

writePrettierFile.sync = writePrettierFileSync
export default writePrettierFile
