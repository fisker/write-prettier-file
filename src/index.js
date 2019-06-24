import { dirname, join } from "path"
import importPrettier from "./import-prettier"
import { writeFileSync, writeFile } from "./fs-promises"

async function writePrettierFile(file, data, options = {}) {
  options = {
    loadConfig: true,
    formatWithCursor: false,
    ...options
  }

  const prettier = importPrettier([
    dirname(file),
    process.cwd(),
    join(__dirname, "..")
  ])

  const config = await prettier.resolveConfig(file, options)
  const formatted = prettier[
    options.formatWithCursor ? "formatWithCursor" : "format"
  ](data, {
    ...config,
    ...options
  })
  const result = await writeFile(file, formatted, options)
  return result
}

function writePrettierFileSync(file, data, options) {
  options = {
    loadConfig: true,
    formatWithCursor: false,
    ...options
  }

  const prettier = importPrettier([
    dirname(file),
    process.cwd(),
    join(__dirname, "..")
  ])

  const config = prettier.resolveConfig.sync(file, options)
  const formatted = prettier[
    options.formatWithCursor ? "formatWithCursor" : "format"
  ](data, {
    ...config,
    ...options
  })
  const result = writeFileSync(file, formatted, options)
  return result
}

writePrettierFile.sync = writePrettierFileSync
export default writePrettierFile
