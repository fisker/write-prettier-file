import {dirname, join} from 'path'
import fs from 'fs-extra'
import importPrettier from './import-prettier'

const defaultOptions = {
  write: true,
  loadConfig: true,
  formatWithCursor: false,
}

async function writePrettierFile(file, data, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  }

  const directory = dirname(file)

  const prettier = importPrettier([
    directory,
    process.cwd(),
    join(__dirname, '..'),
  ])

  const config = await prettier.resolveConfig(file, options)
  const formatted = prettier[
    options.formatWithCursor ? 'formatWithCursor' : 'format'
  ](data, {
    ...config,
    ...options,
  })

  if (options.write) {
    await fs.ensureDir(directory)
    return fs.writeFile(file, formatted, options)
  }

  return formatted
}

function writePrettierFileSync(file, data, options) {
  options = {
    ...defaultOptions,
    ...options,
  }
  const directory = dirname(file)

  const prettier = importPrettier([
    directory,
    process.cwd(),
    join(__dirname, '..'),
  ])

  const config = prettier.resolveConfig.sync(file, options)
  const formatted = prettier[
    options.formatWithCursor ? 'formatWithCursor' : 'format'
  ](data, {
    ...config,
    ...options,
  })

  if (options.write) {
    fs.ensureDirSync(directory)
    return fs.writeFileSync(file, formatted, options)
  }

  return formatted
}

writePrettierFile.sync = writePrettierFileSync
export default writePrettierFile
