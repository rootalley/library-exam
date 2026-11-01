// canvas chrome: global nav, course header, course nav
import { images } from './themes.js'

const FONT = 'Lato, "Lato Extended", "Helvetica Neue", Helvetica, Arial, sans-serif'

function NavIcon({ item }) {
  if (item.avatar) {
    return <img src={images.avatar} alt="" width="34" height="34" style={{ borderRadius: '50%', border: '2px solid #fff', boxSizing: 'content-box', display: 'block', margin: '0 auto' }} />
  }
  return null
}

export function GlobalNav({ brand }) {
  return (
    <nav style={{ width: 84, background: brand.vars['ic-brand-global-nav-bgd'], fontFamily: FONT }}>
      <div style={{ height: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={brand.logo} alt="" style={{ width: 72, height: 72, objectFit: 'contain' }} />
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {brand.nav.map((item) => (
          <li key={item.label}>
            <a href="#" style={{ display: 'block', padding: '7px 0', textAlign: 'center', textDecoration: 'none', color: '#fff' }}>
              <NavIcon item={item} />
              <div style={{ fontSize: 14, lineHeight: '19.6px', marginTop: 3 }}>{item.label}</div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
