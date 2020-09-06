import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import * as actType from './redux/action/actiontype'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { useStateValue } from './redux/StateProvider'
import { auth } from './utils/config/firebase'

function App() {
  const [, dispatch] = useStateValue()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // the user is logged in
        dispatch({
          type: actType.SET_USER,
          user: authUser,
        })
      } else {
        // the user is logged out
        dispatch({
          type: actType.SET_USER,
          user: null,
        })
      }
    })
    // cleanup
    return () => {
      unsubscribe()
    }
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path='/checkout'>
          <Header />
          <Checkout />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
