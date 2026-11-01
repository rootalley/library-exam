import gtLogo from './assets/gt_logo.png'

// nav items, the icons come later
const navItems = ['Account', 'Dashboard', 'Courses', 'Groups', 'Calendar', 'Inbox', 'History', 'My Media', 'Help']

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* top alert banner */}
      <div style={{ background: '#d04a02', color: '#fff', textAlign: 'center', padding: '3px 12px', fontSize: 14, fontWeight: 'bold' }}>
        Prototype for CS 6750 evaluation. Not real Canvas. Sample data only.
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* global navigation goes here */}
        <nav style={{ width: 84, background: '#857437' }}>
          <div style={{ height: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={gtLogo} alt="" style={{ width: 72, height: 72, objectFit: 'contain' }} />
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((label) => (
              <li key={label}>
                <a href="#" style={{ display: 'block', padding: '7px 0', textAlign: 'center', textDecoration: 'none', color: '#fff', fontSize: 14, lineHeight: '19.6px' }}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* main panel goes here */}
        <main style={{ flex: 1 }} />
      </div>
    </div>
  )
}
