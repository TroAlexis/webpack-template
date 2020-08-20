const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

// https://www.npmjs.com/package/imagemin-webpack-plugin
const ImageMinPlugin = require('imagemin-webpack-plugin').default;

// https://www.npmjs.com/package/imagemin-mozjpeg
const ImageMinMozJpeg = require('imagemin-mozjpeg');

isProd = true;

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [
          // Optimize images
    new ImageMinPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      jpegtran: null,
      // Optimization 1-7 levels.
      optipng: { optimizationLevel: 7 },
      // Optimization 1-3 levels.
      gifsicle: { optimizationLevel: 3 },
      plugins: [
          ImageMinMozJpeg({
            quality: 73,
            // progressive or arithmetic encoding available
            progressive: true
          })
      ]
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
