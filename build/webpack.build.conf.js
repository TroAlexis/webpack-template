const merge = require('webpack-merge');

// https://www.npmjs.com/package/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// https://github.com/webpack-contrib/eslint-webpack-plugin
const ESLintPlugin = require('eslint-webpack-plugin');

// https://webpack.js.org/plugins/stylelint-webpack-plugin/
const StylelintPlugin = require('stylelint-webpack-plugin');

// https://www.npmjs.com/package/imagemin-webpack-plugin
const ImageMinPlugin = require('imagemin-webpack-plugin').default;

// https://www.npmjs.com/package/imagemin-mozjpeg
const ImageMinMozJpeg = require('imagemin-mozjpeg');

const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [
    //  Clean dist folder.
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      context: baseWebpackConfig.externals.paths.src,
      fix: true,
    }),
    new StylelintPlugin({
      fix: true,
    }),
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
          progressive: true,
        }),
      ],
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
