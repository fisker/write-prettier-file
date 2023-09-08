import * as path from 'node:path'
import fs from 'node:fs/promises'
import format from 'prettier-format'
import {toPath} from 'url-or-path'

async function writeFile(file, data, options) {
  await fs.mkdir(path.dirname(file), {recursive: true})
  return fs.writeFile(file, data, options)
}

async function writePrettierFile(file, data, options) {
  file = toPath(file)
  options = {...options}
  if (options.resolveConfig !== false) {
    options.filepath = file
  }
  const formatted = await format(data, options)
  return writeFile(file, formatted, options)
}

export default writePrettierFile
