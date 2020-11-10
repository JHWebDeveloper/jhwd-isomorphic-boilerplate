import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { string } from 'prop-types'

import App from './App'

const HTMLTemplate = ({ location }) => (
	<html lang="en-US">
		<head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<title></title>
			<meta name="description" content="" />
			<link rel="stylesheet" href="./css/index.min.css" />
		</head>
		<body>
			<div id="root">
				<StaticRouter location={location}>
					<App/>
				</StaticRouter>
			</div>
			<script src="./index.bundle.js"></script>
		</body>
	</html>
)

HTMLTemplate.propTypes = {
	location: string.isRequired
}

export default HTMLTemplate
