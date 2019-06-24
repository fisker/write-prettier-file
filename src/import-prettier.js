import importFrom from "import-from"

function importPrettier(directories) {
  for (const directory of directories) {
    const prettier = importFrom.silent(directory, "prettier")

    if (prettier) {
      return prettier
    }
  }
}

export default importPrettier
