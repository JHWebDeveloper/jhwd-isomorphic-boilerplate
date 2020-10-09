const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssMQPacker = require('css-mqpacker')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src', 'client')
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
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
							postcssOptions: {
								plugins: [
									postcssPresetEnv({ stage: 0 }),
									cssMQPacker({ sort: true })
								]
							}
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
			filename: path.join('css', 'main.min.css')
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}
