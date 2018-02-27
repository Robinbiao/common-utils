// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:

var path = require('path')
var babel = require('rollup-plugin-babel')
var pkg = require('./package.json')

var plugins = [
  babel({
    babelrc: true,
    runtimeHelpers: true,
    exclude: 'node_modules/**'
  })
]

var banner =
  '/*!\n' +
  ' * utils v' + pkg.version + '\n' +
  ' * https://git.analysys.io/fss-modules/utils\n' +
  ' *\n' +
  ' * @author ' + pkg.author + '.\n' +
  ' * Released under the MIT License.\n' +
  ' */\n'

module.exports = {
  rollup: {
    destDir: path.join(__dirname, './dist'),
    entry: [
      {
        input: 'src/index.js',
        plugins,
        targets: [
          {
            format: 'umd',
            name: '__',
            file: 'util.js',
            banner
          },
          {
            format: 'cjs',
            file: 'util.esm.js',
            banner
          }
        ]
      }
    ]
  }
}
