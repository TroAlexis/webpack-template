const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// ------------ REQUIRE ALL PLUGINS ------------
//  https://webpack.js.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// https://webpack.js.org/plugins/copy-webpack-plugin/
const CopyWebpackPlugin = require('copy-webpack-plugin');

// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

// Main const for directory paths
const PATHS = {
  dirname: path.relative(path.resolve(__dirname, '../..'), path.resolve(__dirname, '..')),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets',
  pug: 'pug',
  entries: 'entries',
};

const ALIASES = {
  '~': PATHS.src,
  Scss: path.resolve(__dirname, `../src/${PATHS.assets}/scss`),
  Images: path.resolve(__dirname, `../src/${PATHS.assets}/img`),
  Fonts: path.resolve(__dirname, `../src/${PATHS.assets}/fonts`),
  Components: path.resolve(__dirname, '../src/js/components'),
  Pug: path.resolve(__dirname, `../src/${PATHS.pug}`),
  Includes: path.resolve(__dirname, `../src/${PATHS.pug}/includes`),
};

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/${PATHS.entries}/`;
// Entries const for entry option
const ENTRIES_DIR = `${PATHS.src}/${PATHS.entries}/`;
// All pages templates to build
const PAGES = fs.readdirSync(PAGES_DIR);
// All entries to take.
const ENTRIES_LIST = fs.readdirSync(ENTRIES_DIR);
const ENTRIES = {};
// Fill ENTRIES object with all entry points
ENTRIES_LIST.forEach((entry) => {
  ENTRIES[`${entry}`] = `${ENTRIES_DIR}/${entry}/${entry}.js`;
});

const CSS_LOADERS = [
  {
    loader: MiniCssExtractPlugin.loader,
    // Enable HMR only in development mode.
    options: {
      hmr: !isProd,
      reloadAll: !isProd,
    },
  },
  {
    loader: 'css-loader',
    options: {
      modules: {
        auto: /^((?!global).)*$/i,
        localIdentName: !isProd ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]',
      },
      sourceMap: true,
    },
  }, {
    loader: 'postcss-loader',
    options: { sourceMap: true, config: { path: './postcss.config.js' } },
  },
];

const FILE_LOADER_IMG_OPTS = {
  outputPath: `${PATHS.assets}/images`,
  name: `[name]${isProd ? '-[contenthash]' : ''}.[ext]`,
};

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: ENTRIES,
  output: {
    filename: `${PATHS.assets}/js/[name].${isProd ? '[contenthash].' : ''}js`,
    path: PATHS.dist,
    pathinfo: isProd,
    publicPath: isProd ? `/${PATHS.dirname}/` : '/',
  },
  optimization: {
    splitChunks: isProd ? {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true,
        },
        common: {
          name: 'common',
          test: /[\\/](pug|js)[\\/]/,
          chunks: 'all',
          enforce: true,
        },
      },
    } : false,
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd,
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: ['pug-loader'],
    }, {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
      exclude: '/node_modules/',
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      exclude: [/img/],
      loader: 'file-loader',
      options: {
        outputPath: `${PATHS.assets}/fonts`,
        name: `[name]${isProd ? '-[contenthash]' : ''}.[ext]`,
      },
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: FILE_LOADER_IMG_OPTS,
    }, {
      // SVGR support along with file-loader.
      test: /\.(svg)$/i,
      use: ['@svgr/webpack', {
        loader: 'file-loader',
        options: FILE_LOADER_IMG_OPTS,
      }],
    }, {
      test: /\.scss$/,
      use: [
        ...CSS_LOADERS,
        {
          loader: 'resolve-url-loader',
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        ...CSS_LOADERS,
      ],
    }],
  },
  resolve: {
    alias: ALIASES,
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new FriendlyErrorsWebpackPlugin(),
    //  Extract css into separate files from html.
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].${isProd ? '[contenthash].' : ''}css`,
      chunkFilename: `${PATHS.assets}/css/[name].${isProd ? '[contenthash].' : ''}css`,
    }),
    //  Copy images, fonts, static files to dist folder.
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/static`, to: '' },
      ],
    }),
    // Automatic creation of any html pages
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}/${page}.pug`,
      filename: `./${page}.html`,
      favicon: `${PATHS.src}/${PATHS.assets}/img/favicon.ico`,
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
      chunks: [`${page}`, 'vendors', 'common'],
    })),
  ],
};
