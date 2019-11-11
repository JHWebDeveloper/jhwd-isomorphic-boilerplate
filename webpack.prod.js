const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssMQPacker = require('css-mqpacker')
const cssnano = require('cssnano')

const jsloader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['babel-loader']
}

const serverConfig = {
  mode: 'production',
  entry: './src/server',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      jsloader,
      {
        test: /\.(css)$/,
        use: [{
          loader: 'file-loader',
          options: {
            emitFile: false
          }
        }]
      }
    ]
  }
}

const browserConfig = {
  mode: 'production',
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'build', 'client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      jsloader,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                postcssPresetEnv({ stage: 0 }),
                cssMQPacker({ sort: true }),
                cssnano()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
			'process.env.WEBPACK': true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.min.css',
    })
  ]
}

module.exports = [
  serverConfig,
  browserConfig
]