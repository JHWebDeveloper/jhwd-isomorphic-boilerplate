import express from 'express'
import helmet from 'helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchRoutes } from 'react-router-config'

import routes from '../shared/routes'
import HTMLTemplate from '../shared/components/HTMLTemplate'

const app = express()
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV === 'development'

app.use(helmet({
	contentSecurityPolicy: false
}))

if (dev) {
	const config = require('../../webpack.dev.js')
	const compiler = require('webpack')(config)

	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath
	}))

	app.use(require('webpack-hot-middleware')(compiler))
}

app.use(express.static('client'))

app.get('*', (req, res) => {
	const branch = matchRoutes(routes, req.url)

	const promises = branch.map(({ route, match }) => route.loadData
		? route.loadData(match)
		: Promise.resolve(null))

	Promise.all(promises).then(() => {
		const html = renderToString(<HTMLTemplate location={req.url} />)
		res.send(`<!DOCTYPE html>${html}`)
	})
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`) // eslint-disable-line no-console

	if (dev) require('./reload_browser').reload(port)
})
