import React from 'react'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import { createRoot } from 'react-dom/client'
import { InstUISettingsProvider } from '@instructure/ui'
import { brandFromUrl, instuiTheme } from './themes.js'
import App from './App.jsx'

const brand = brandFromUrl()

// every InstUI component below this picks up the theme
// docs for the components and themes: https://instructure.design/
createRoot(document.getElementById('root')).render(
  <InstUISettingsProvider theme={instuiTheme(brand)}>
    <App brand={brand} />
  </InstUISettingsProvider>
)
