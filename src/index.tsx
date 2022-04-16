import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import reportWebVitals from './reportWebVitals'

import { App } from './App'
import { CalculatorStoreProvider } from './store/CalculatorStore'

ReactDOM.render(
  <React.StrictMode>
    <CalculatorStoreProvider>
      <App />
    </CalculatorStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
