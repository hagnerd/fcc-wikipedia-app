const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: {
    vendor: [],
    index: './src/js/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/js')
  },

  modules: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }
    ]
  }

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // filename: "vendor.js"

    minChunks: Infinity,
    // (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
  })

  ]
}
