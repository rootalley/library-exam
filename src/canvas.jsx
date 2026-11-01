// canvas chrome: global nav, course header, course nav
const FONT = 'Lato, "Lato Extended", "Helvetica Neue", Helvetica, Arial, sans-serif'

export function GlobalNav({ brand }) {
  return (
    <nav style={{ width: 84, background: brand.vars['ic-brand-global-nav-bgd'], fontFamily: FONT }}>
      <div style={{ height: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={brand.logo} alt="" style={{ width: 72, height: 72, objectFit: 'contain' }} />
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {brand.nav.map((item) => (
          <li key={item.label}>
            <a href="#" style={{ display: 'block', padding: '7px 0', textAlign: 'center', textDecoration: 'none', color: '#fff', fontSize: 14, lineHeight: '19.6px' }}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
