import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'
// import { store } from './redux/store.js'
// import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // </Provider>
)
