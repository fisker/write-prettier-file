import test from 'ava'
import path from 'path'
import fs, {unlinkSync, readFileSync} from 'fs'
import tempy from 'tempy'
import dedent from 'dedent'
import writePrettierFile from '../src'

const temporaryDirectory = tempy.directory()

test('default', async t => {
  const input = `
    var foo
                = 'bar'
  `
  const expected = `var foo = "bar";
`
  const file = tempy.file({extension: 'js'})
  await writePrettierFile(file, input)
  const actual = readFileSync(file, 'utf8')
  t.is(actual, expected)
})

test('options', async t => {
  const input = 'var foo = "bar";'
  const expected = `var foo = "bar"
`
  const file = tempy.file({extension: 'js'})
  await writePrettierFile(file, input, {
    semi: false,
  })
  const actual = readFileSync(file, 'utf8')
  t.is(actual, expected)
})

test('configFile', async t => {
  const file = path.join(temporaryDirectory, 'test.js')
  const rc = path.join(temporaryDirectory, '.prettierrc')
  fs.writeFileSync(rc, `{"semi": false}`)

  const input = 'var foo = "bar";'
  const expected = `var foo = "bar"
`
  await writePrettierFile(file, input)
  const actual = readFileSync(file, 'utf8')
  t.is(actual, expected)
  unlinkSync(rc)
})
