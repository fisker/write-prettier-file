import path from 'path'
import makeDirectory from 'make-dir'
import writeFileAtomic from 'write-file-atomic'
import format from 'prettier-format'

const defaultOptions = {
  resolveConfig: true,
}

async function writeFile(file, data, options) {
  await makeDirectory(path.dirname(file))
  return writeFileAtomic(file, data, options)
}

function writeFileSync(file, data, options) {
  makeDirectory.sync(path.dirname(file))
  return writeFileAtomic.sync(file, data, options)
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
