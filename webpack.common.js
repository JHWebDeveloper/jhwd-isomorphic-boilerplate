const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { EnvironmentPlugin } = require('webpack')
const postcssPresetEnv = require('postcss-preset-env')
const cssMQPacker = require('css-mqpacker')

module.exports = {
	target: 'web',
	output: {
		path: path.resolve('build', 'client'),
		filename: '[name].bundle.js',
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
		new EnvironmentPlugin({
			WEBPACK: true
		}),
		new MiniCssExtractPlugin({
			filename: path.join('css', '[name].min.css')
		})
	]
}
