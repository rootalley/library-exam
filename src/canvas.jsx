// canvas chrome: global nav, course header, course nav
import gtLogo from './assets/gt_logo.png'

const FONT = 'Lato, "Lato Extended", "Helvetica Neue", Helvetica, Arial, sans-serif'

// nav items, the icons come later
const navItems = ['Account', 'Dashboard', 'Courses', 'Groups', 'Calendar', 'Inbox', 'History', 'My Media', 'Help']

export function GlobalNav() {
  return (
    <nav style={{ width: 84, background: '#857437', fontFamily: FONT }}>
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
  )
}
