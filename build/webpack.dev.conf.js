// ReactRefresh
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// Webpack
const webpack = require('webpack');
// Merge tool to merge configs
const merge = require('webpack-merge');

// Firewall for undesired connections when developing
// as host is set to 0.0.0.0, everyone in the network can access the project.
// inf 'ip addr show' to see the ip of the server.
// https://github.com/funbox/webpack-dev-server-firewall
const firewall = require('@funboxteam/webpack-dev-server-firewall');

// Webpack bundle analyzer
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Base webpack config
const baseWebpackConfig = require('./webpack.base.conf');

// Forget known hosts to prevent intruders from already known IP.
firewall.forgetKnownHosts();

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // Enables reload when template Pug files are changed.
    before(app, server) {
      // Launches firewall
      firewall(app);
      // watches files in templates directory
      server._watch('src/pug/**/**.pug');
    },
    contentBase: baseWebpackConfig.externals.paths.dist,
    // Enables hot module replacement
    hot: true,
    quiet: true,
    // Let mobile device connection
    host: '0.0.0.0',
    port: 8081,
    open: true,
    openPage: 'http://localhost:8081/',
    overlay: {
      warnings: true,
      errors: true,
    },
    historyApiFallback: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
