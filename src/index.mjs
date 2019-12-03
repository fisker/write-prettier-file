import path from 'path'
import fs from 'fs-extra'
import format from 'prettier-format'

const defaultOptions = {
  resolveConfig: true,
}

async function writeFile(file, data, options) {
  await fs.ensureDir(path.dirname(file))
  return fs.writeFile(file, data, options)
}

function writeFileSync(file, data, options) {
  fs.ensureDirSync(path.dirname(file))
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
