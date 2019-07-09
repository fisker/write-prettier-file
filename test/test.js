import path from 'path'
import test from 'ava'
import fs from 'fs-extra'
import tempy from 'tempy'
import dedent from 'dedent'
import writePrettierFile from '../src'

test('main', async t => {
  const input = dedent`
    var foo
                = 'bar'
  `
  const expected = dedent`
    var foo = "bar";
  `
  const file = tempy.file({extension: 'js'})
  await writePrettierFile(file, input, {
    parser: 'babel',
  })
  const actual = await fs.readFile(file, 'utf8')
  t.is(actual.trim(), expected)
})

test('non-existing dir', async t => {
  const input = 'var foo = "bar";'
  const expected = 'var foo = "bar";'
  const directory = path.join(tempy.directory(), 'foo')
  t.false(await fs.exists(directory))
  const file = path.join(directory, 'bar.js')
  await writePrettierFile(file, input, {
    parser: 'babel',
  })
  const actual = await fs.readFile(file, 'utf8')
  t.is(actual.trim(), expected)
})

test('options', async t => {
  const input = 'var foo = "bar";'
  const expected = 'var foo = "bar"'
  const file = tempy.file({extension: 'js'})
  await writePrettierFile(file, input, {
    parser: 'babel',
    semi: false,
  })
  const actual = await fs.readFile(file, 'utf8')
  t.is(actual.trim(), expected)
})

test('configFile', async t => {
  const directory = tempy.directory()
  const file = path.join(directory, 'test.js')
  const rc = path.join(directory, '.prettierrc')
  await fs.writeJSON(rc, {
    parser: 'babel',
    semi: false,
  })

  const input = 'var foo = "bar";'
  const expected = 'var foo = "bar"'
  await writePrettierFile(file, input)
  const actual = await fs.readFile(file, 'utf8')
  t.is(actual.trim(), expected)
  fs.unlinkSync(rc)
})
