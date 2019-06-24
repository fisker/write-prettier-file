import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import cjs from "rollup-plugin-commonjs"
import filesize from "rollup-plugin-filesize"

export default {
  input: "src/index.js",
  output: {
    file: "lib/index.js",
    format: "cjs"
  },
  plugins: [babel(), filesize()]
}
