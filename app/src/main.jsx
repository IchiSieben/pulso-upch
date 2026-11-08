import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import * as prefs from './prefs.js'
import './styles.css'

prefs.apply(prefs.load())
createRoot(document.getElementById('root')).render(<App />)
