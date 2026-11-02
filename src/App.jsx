import { Text } from '@instructure/ui'
import { GlobalNav } from './canvas.jsx'
import { brands } from './themes.js'

// only the gt theme for now
const brand = brands.gt

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* top alert banner */}
      {/* the plain div had a serif font, the InstUI Text component brings the canvas font */}
      <div style={{ background: '#d04a02', color: '#fff', textAlign: 'center', padding: '3px 12px', flex: 'none' }}>
        <Text size="small" weight="bold" color="primary-inverse">
          Prototype for CS 6750 evaluation. Not real Canvas. Sample data only.
        </Text>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* global navigation goes here */}
        <GlobalNav brand={brand} />

        {/* main panel goes here */}
        <main style={{ flex: 1 }} />
      </div>
    </div>
  )
}
