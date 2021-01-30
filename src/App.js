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
import Orders from './components/Orders'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Payment from './components/Payment'

const promise = loadStripe(
  "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
)

function App() {
  const [, dispatch] = useStateValue()
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
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
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path='/orders'>
          <Header />
          <Orders />
        </Route>
        <Route path='/checkout'>
          <Header />
          <Checkout />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/payment'>
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
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
