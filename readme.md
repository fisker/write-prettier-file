# write-prettier-file

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/write-prettier-file/CI/master?style=flat-square
[github_actions_link]: https://github.com/fisker/write-prettier-file/actions?query=branch%3Amaster
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/write-prettier-file/master?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/write-prettier-file?branch=master
[license_badge]: https://img.shields.io/npm/l/write-prettier-file.svg?style=flat-square
[license_link]: https://github.com/fisker/write-prettier-file/blob/master/license
[package_version_badge]: https://img.shields.io/npm/v/write-prettier-file.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/write-prettier-file

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
