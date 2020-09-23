import React from 'react'
import { renderRoutes } from 'react-router-config'

if (process.env.WEBPACK) require('../css/index.css')

import { Provider } from '../store'
import routes from '../routes'

const App = () => (
	<Provider>
		{renderRoutes(routes)}
	</Provider>
)

export default App
