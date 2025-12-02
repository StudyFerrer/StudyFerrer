import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
    <Toaster position="top-center" />
  </React.StrictMode>
)
