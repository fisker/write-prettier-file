# write-prettier-file

> write prettier formatted file

## Install

```sh
yarn add write-prettier-file
```

## Ustage

```js
const writePrettierFile = require('write-prettier-file')

writePrettierFile('example.js', `hello('world');`)
```

## API

### writePrettierFile(file, data, options?)

#### file

Type: `string`

Path to file.

#### data

Type: `string`

Source code, you want to format

#### options

Type: `object`

any value [`prettier-format`](https://github.com/fisker/prettier-format) takes

#### options.resolveConfig

Type: `boolean`

Set to `false` to prevent load config.

### writePrettierFile.sync(file, data, options?)

Sync version.

## Related

- [prettier-format](https://github.com/fisker/prettier-format) run prettier on code.
