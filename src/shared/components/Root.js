import React from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { object } from 'prop-types'

const Root = ({ route }) => (
	<Switch>
		{renderRoutes(route.routes)}
	</Switch>
)

Root.propTypes = {
	route: object.isRequired
}

export default Root
