const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'post',
        include: path.resolve(__dirname, 'src'),
        exclude: [/\.(spec|cy)\.ts$/],
        use: {
          loader: '@jsdevtools/coverage-istanbul-loader',
          options: {
            esModules: true
          }
        }
      }
    ]
  }
};
