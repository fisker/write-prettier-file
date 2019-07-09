import path from 'path'
import test from 'ava'
import fs from 'fs-extra'
import tempy from 'tempy'
import dedent from 'dedent'
import writePrettierFile from '../src'

async function tester(
  t,
  {input, expected, options, directory = path.join(tempy.directory(), 'foo')}
) {
  // async
  const file = path.join(directory, 'async.js')
  const result = writePrettierFile(file, input, options)
  t.truthy(result.then)
  await result
  const actual = await fs.readFile(file, 'utf8')
  t.is(actual, `${expected}\n`)

  // sync
  const fileSync = path.join(directory, 'sync.js')
  const resultSync = writePrettierFile.sync(file, input, options)
  t.truthy(!resultSync || !resultSync.then)
  const actualSync = await fs.readFile(file, 'utf8')
  t.is(actual, `${expected}\n`)
}

test('main', async t => {
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

test('options.resolveConfig', async t => {
  const directory = path.join(tempy.directory(), 'foo')
  const configFile = path.join(directory, 'prettier.config.js')
  await fs.ensureDir(directory)
  await fs.writeFile(
    configFile,
    dedent`
    module.exports = {
      singleQuote: true,
    }
  `
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
