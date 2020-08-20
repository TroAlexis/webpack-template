const path = require('path');
const fs = require('fs');
// ------------ REQUIRE ALL PLUGINS ------------
//  https://webpack.js.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// https://www.npmjs.com/package/clean-webpack-plugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// https://webpack.js.org/plugins/copy-webpack-plugin/
const CopyWebpackPlugin = require('copy-webpack-plugin');

// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ---- Variable to differ production mode from development -----
let isProd = false;


// Main const for directory paths
const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
// Entries const for entry option
const ENTRIES_DIR = `${PATHS.src}`;
// All pages to build
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));
// All entries to take.
const ENTRIES_LIST = fs.readdirSync(ENTRIES_DIR).filter(fileName => fileName.endsWith('.js'));
const ENTRIES = {}
// Fill ENTRIES object with all entry points
for (const entry of ENTRIES_LIST) {
  ENTRIES[`${entry.replace(/\.js/, '')}`] = `${PATHS.src}/${entry}`
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: ENTRIES,
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: ['pug-loader']
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/fonts/[name].[ext]',
        // publicPath: '../../'
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)$/i,
      loader: 'file-loader',
      options: {
        name: 'assets/img/[name].[ext]',
        // publicPath: '../../'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          // Enable HMR only in development mode.
          options: {
            hmr: !isProd,
            reloadAll: !isProd,
          }
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          // Enable HMR only in development mode.
          options: {
            hmr: !isProd,
            reloadAll: !isProd
          }
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
    }
  },
  plugins: [
    //  Extract css into separate files from html.
    new MiniCssExtractPlugin({
      // Enable has in production mode only (prevents HMR in development)
      filename: `${PATHS.assets}css/[name].${isProd ? '[hash].' : ''}css`,
    }),
    //  Clean dist folder.
    new CleanWebpackPlugin(),
    //  Copy images, fonts, static files to dist folder.
    new CopyWebpackPlugin({ patterns: [
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
    ]}),
    // Automatic creation of any html pages
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./pages/${page.replace(/\.pug/,'.html')}`,
      chunks: [`${page.replace(/\.pug/, '')}`, 'vendors']
    })),
  ],
}
