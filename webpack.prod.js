const { merge } = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { IgnorePlugin } = require('webpack')

const common = require('./webpack.common')

const serverConfig = {
	mode: 'production',
	target: 'node',
	entry: {
		server: path.join(__dirname, 'src', 'server')
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/'
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			common.module.rules[0] //.js
		]
	},
	plugins: [
		new IgnorePlugin({
			resourceRegExp: /\.css$/
		})
	]
}

const browserConfig = merge(common, {
	mode: 'production',
	entry: {
		index: path.join(__dirname, 'src', 'client')
	},
	plugins: [
		new CssMinimizerPlugin({
			minimizerOptions: {
				preset: ['default', { calc: false }]
			}
		})
	]
})

module.exports = [
	serverConfig,
	browserConfig
]
