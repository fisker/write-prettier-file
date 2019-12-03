import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.mjs',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  ],
  plugins: [babel()],
}
