import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { StateProvider } from './redux/StateProvider'
import myReducer, { myInitialState } from './redux/reducer/reducer'

ReactDOM.render(
  <StateProvider initialState={myInitialState} reducer={myReducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
)
