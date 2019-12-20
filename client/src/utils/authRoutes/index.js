import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem('token') ? <Component /> : <Redirect to='/' />
      }
    />
  )
}

// redirects to home from login page if already logged in
export const SignInRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem('token') ? <Redirect to='/home' /> : <Component />
      }
    />
  )
}
