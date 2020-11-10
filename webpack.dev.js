const { merge } = require('webpack-merge')
const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

const common = require('./webpack.common')

module.exports = merge(common, {
	mode: 'development',
	entry: {
		index: [
			'webpack-hot-middleware/client',
			path.resolve(__dirname, 'src', 'client')
		]
	},
	plugins: [
		new HotModuleReplacementPlugin()
	]
})
