import {dirname, join} from 'path'
import importPrettier from './import-prettier'
import {writeFileSync, writeFile} from './fs-promises'

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

  const prettier = importPrettier([
    dirname(file),
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

  return options.write ? writeFile(file, formatted, options) : formatted
}

function writePrettierFileSync(file, data, options) {
  options = {
    ...defaultOptions,
    ...options,
  }

  const prettier = importPrettier([
    dirname(file),
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

  return options.write ? writeFileSync(file, formatted, options) : formatted
}

writePrettierFile.sync = writePrettierFileSync
export default writePrettierFile
