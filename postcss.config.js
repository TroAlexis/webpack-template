// autoprefixer - https://github.com/postcss/autoprefixer
// css-mqpacker - https://github.com/hail2u/node-css-mqpacker
// cssnano      - https://github.com/hail2u/node-css-mqpacker

module.exports = {
  plugins: {
    autoprefixer: {},
    'css-mqpacker': {
      sort: true,
    },
    cssnano: {
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
  },
};
