import React from 'react'
import Root from './components/main/Root'

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: false
      }
    ]
  }
]

export default routes