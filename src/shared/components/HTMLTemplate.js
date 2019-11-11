import React from 'react'
import { StaticRouter } from 'react-router-dom'
import App from '../main/App'

const HTMLTemplate = ({ location }) => (
  <html lang="en-US">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      
      <title></title>
      <meta name="description" content="" />
      <link rel="stylesheet" href="/css/main.min.css" />
    </head>
    <body>
      <div id="root">
        <StaticRouter location={location}>
          <App/>
        </StaticRouter>
      </div>
      <script src="/bundle.js"></script>
    </body>
  </html>
)

export default HTMLTemplate