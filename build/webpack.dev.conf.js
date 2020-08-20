const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // Enables reload when template Pug files are changed.
    before(app, server) {
      // watches files in templates directory
      server._watch('src/pug/pages/**.pug')
    },
    contentBase: baseWebpackConfig.externals.paths.dist,
    // Enables hot module replacement
    hot: true,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
