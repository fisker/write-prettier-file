# write-prettier-file

> write prettier formatted file

## Install

```sh
yarn add write-prettier-file
```

## Ustage

```js
const writePrettierFile = require("write-prettier-file")

writePrettierFile("example.js", `hello('world');`)
```

## API

### writePrettierFile(file, data[, options])

- `file` path to file
- `data` source code, you want to format
- `options` Object
  - `loadConfig` should resolve config, Default `true`
  - `formatWithCursor` should formatWithCursor, Default `false`
  - any options [`fs.writeFile`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) takes
  - any options [`prettier.resolveConfig`](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath-options) takes
  - any options [`prettier.format`](https://prettier.io/docs/en/api.html#prettierformatsource-options) and [`prettier.formatWithCursor`](https://prettier.io/docs/en/api.html#prettierformatwithcursorsource-options) takes
- Returns: `Promise`

### writePrettierFile.sync(file, data[, options])

sync version
