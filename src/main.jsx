import React from 'react'
import { createRoot } from 'react-dom/client'
import { InstUISettingsProvider, canvas } from '@instructure/ui'
import App from './App.jsx'

// every InstUI component below this picks up the canvas theme
// docs for the components and themes: https://instructure.design/
createRoot(document.getElementById('root')).render(
  <InstUISettingsProvider theme={canvas}>
    <App />
  </InstUISettingsProvider>
)
