import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Store from './store/Store.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  <Store>
  <App />
  </Store>
  </Provider>
  </BrowserRouter>
    
)
