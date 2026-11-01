import { GlobalNav } from './canvas.jsx'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* top alert banner */}
      <div style={{ background: '#d04a02', color: '#fff', textAlign: 'center', padding: '3px 12px', fontSize: 14, fontWeight: 'bold' }}>
        Prototype for CS 6750 evaluation. Not real Canvas. Sample data only.
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* global navigation goes here */}
        <GlobalNav />

        {/* main panel goes here */}
        <main style={{ flex: 1 }} />
      </div>
    </div>
  )
}
