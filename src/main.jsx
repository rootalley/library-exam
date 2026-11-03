import React from 'react'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import { createRoot } from 'react-dom/client'
import { InstUISettingsProvider, canvas } from '@instructure/ui'
import { brands } from './themes.js'
import App from './App.jsx'

// every InstUI component below this picks up the canvas theme
// docs for the components and themes: https://instructure.design/
// the canvas theme uses the same variable names as the brand colors, so the gt colors go straight in
const theme = { ...canvas, ...brands.gt.vars }

createRoot(document.getElementById('root')).render(
  <InstUISettingsProvider theme={theme}>
    <App />
  </InstUISettingsProvider>
)
