import path from 'node:path'
import fs from 'node:fs'
import format from 'prettier-format'
import {toPath} from 'url-or-path'

const defaultOptions = {
  resolveConfig: true,
}

async function writeFile(file, data, options) {
  await fs.promises.mkdir(path.dirname(file), {recursive: true})
  return fs.promises.writeFile(file, data, options)
}

async function writePrettierFile(file, data, options = {}) {
  file = toPath(file)

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

export default writePrettierFile
