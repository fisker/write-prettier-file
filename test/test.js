import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url'
import test from 'ava'
import {temporaryDirectory as createTemporaryDirectory} from 'tempy'
import dedent from 'dedent'
import writePrettierFile from '../index.js'

async function tester(
  t,
  {
    input,
    expected,
    options,
    directory = path.join(createTemporaryDirectory(), 'foo'),
  },
) {
  // async
  const file = path.join(directory, 'async.js')
  const result = writePrettierFile(file, input, options)
  t.truthy(result.then)
  await result
  const actual = await fs.promises.readFile(file, 'utf8')
  t.is(actual, `${expected}\n`)
}

test('main', async (t) => {
  await tester(t, {
    input: dedent`
      var foo
                  = 'bar'
    `,
    expected: dedent`
      var foo = "bar";
    `,
  })
})

test('options.resolveConfig', async (t) => {
  const directory = path.join(createTemporaryDirectory(), 'foo')
  const configFile = path.join(directory, 'prettier.config.js')
  await fs.promises.mkdir(directory, {recursive: true})
  await fs.promises.writeFile(
    configFile,
    dedent`
      module.exports = {
        singleQuote: true,
      }
    `,
  )

  await tester(t, {
    input: dedent`
      // this should be singleQuoted
      var foo = 'bar'
    `,
    expected: dedent`
      // this should be singleQuoted
      var foo = 'bar';
    `,
    directory,
  })

  await tester(t, {
    input: dedent`
      // this should be doubleQuoted
      var foo = 'bar'
    `,
    expected: dedent`
      // this should be doubleQuoted
      var foo = "bar";
    `,
    directory,
    options: {
      resolveConfig: false,
    },
  })
})

test('Should support `URL`', async (t) => {
  const code = dedent`
    var foo =
    "bar"
  `

  const directory = createTemporaryDirectory()
  const asyncFile = path.join(directory, 'async.js')
  await writePrettierFile(url.pathToFileURL(asyncFile), code)

  const actualAsync = await fs.promises.readFile(asyncFile, 'utf8')
  t.is(actualAsync, 'var foo = "bar";\n')
})
