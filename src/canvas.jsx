// canvas chrome: global nav, course header, course nav
import { IconArrowOpenEndSolid, IconHamburgerLine } from '@instructure/ui-icons'
import { images } from './themes.js'

const FONT = 'Lato, "Lato Extended", "Helvetica Neue", Helvetica, Arial, sans-serif'

function NavIcon({ item }) {
  if (item.avatar) {
    return <img src={images.avatar} alt="" width="34" height="34" style={{ borderRadius: '50%', border: '2px solid #fff', boxSizing: 'content-box', display: 'block', margin: '0 auto' }} />
  }
  if (item.img) return <img src={images[item.img]} alt="" style={{ display: 'block', margin: '5px auto' }} />
  if (item.svg) {
    // the svg strings from canvas go in as raw html, react docs on dangerouslySetInnerHTML: https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
    return <span className="ic-nav-svg" dangerouslySetInnerHTML={{ __html: item.svg }} />
  }
  return null
}

export function GlobalNav({ brand, active = 'Courses' }) {
  const dark = brand.vars['ic-brand-font-color-dark']
  // the active item is white with a colored icon and label, colors read from the live page
  const activeText = brand.vars['proto-nav-active-text'] || dark
  const activeIcon = brand.vars['proto-nav-active-icon'] || dark
  return (
    <nav style={{ width: 84, background: brand.vars['ic-brand-global-nav-bgd'], fontFamily: FONT }}>
      {/* every icon gets the same 26px box so they line up */}
      <style>{`.ic-nav-svg svg{width:26px;height:26px;display:block;margin:0 auto;fill:currentColor}`}</style>
      <div style={{ height: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={brand.logo} alt="" style={{ width: 72, height: 72, objectFit: 'contain' }} />
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {brand.nav.map((item) => {
          const on = item.label === active
          return (
            <li key={item.label}>
              <a href="#" style={{ display: 'block', padding: '7px 0', textAlign: 'center', textDecoration: 'none', color: on ? activeIcon : '#fff', background: on ? '#fff' : 'transparent' }}>
                <NavIcon item={item} />
                <div style={{ fontSize: 14, lineHeight: '19.6px', marginTop: 3, color: on ? activeText : '#fff' }}>{item.label}</div>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// the bar under the global nav: course code, an arrow, and the page name
export function CourseHeader({ course, page, linkColor }) {
  return (
    <header style={{ height: 72, margin: '0 24px', borderBottom: '1px solid #c7cdd1', display: 'flex', alignItems: 'center', fontFamily: FONT, color: '#000' }}>
      {/* the menu button, it doesn't do anything in the prototype */}
      <button type="button" aria-label="Toggle course navigation" style={{ width: 36, height: 30, margin: '0 12px 0 0', border: '1px solid transparent', borderRadius: 3, background: 'none', color: linkColor, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <IconHamburgerLine />
      </button>
      <span style={{ fontSize: 18, lineHeight: '27px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: linkColor, textDecoration: 'none' }}>{course.code}</a>
        <IconArrowOpenEndSolid style={{ fontSize: 12 }} />
        <span>{page}</span>
      </span>
    </header>
  )
}
