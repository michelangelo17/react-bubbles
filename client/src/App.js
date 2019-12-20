import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/Login'
import './styles.scss'
import { PrivateRoute, SignInRoute } from './utils/authRoutes'
import BubblePage from './components/BubblePage'

function App() {
  return (
    <Router>
      <div className='App'>
        <SignInRoute exact path='/' component={Login} />
        <PrivateRoute path='/home' component={BubblePage} />
      </div>
    </Router>
  )
}

export default App
