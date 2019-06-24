import importCwd from "import-cwd"
import { writeFileSync, writeFile } from "./fs-promises"

async function writePrettierFile(file, data, options = {}) {
  options = {
    loadConfig: true,
    formatWithCursor: false,
    ...options
  }

  const prettier = importCwd("prettier")
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

  const prettier = importCwd("prettier")
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

export { writePrettierFile as default, writePrettierFileSync as sync }
