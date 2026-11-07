import { canvas } from '@instructure/ui'
import duSeal from './assets/du_seal.svg'
import gtLogo from './assets/gt_logo.png'
import avatar from './assets/avatar-50.png'
import commons from './assets/commons.png'
import myMedia from './assets/my_media.png'
import duNav from './brands/du.json'
import gtNav from './brands/gt.json'

// brand colors copied from devtools on each school's live canvas dashboard (css custom properties)
// the nav icons are the live canvas svgs too, the logos are used with permission
const brands = {
  gt: {
    name: 'gt',
    logo: gtLogo,
    nav: gtNav,
    vars: {
      'ic-brand-primary': '#857437',
      'ic-brand-global-nav-bgd': '#857437',
      'ic-brand-global-nav-ic-icon-svg-fill': '#ffffff',
      'ic-brand-global-nav-menu-item__text-color': '#ffffff',
      'ic-brand-global-nav-avatar-border': '#ffffff',
      'ic-link-color': '#004F9F',
      'ic-brand-button--primary-bgd': '#857437',
      'ic-brand-button--primary-text': '#ffffff',
      'ic-brand-font-color-dark': '#273540',
      'proto-nav-active-text': '#004F9F',
      'proto-nav-active-icon': '#857437',
    },
  },
  du: {
    name: 'du',
    logo: duSeal,
    nav: duNav,
    vars: {
      'ic-brand-primary': '#1f3c6c',
      'ic-brand-global-nav-bgd': '#1f3c6c',
      'ic-brand-global-nav-ic-icon-svg-fill': '#ffffff',
      'ic-brand-global-nav-menu-item__text-color': '#ffffff',
      'ic-brand-global-nav-avatar-border': '#ffffff',
      'ic-link-color': '#147EB3',
      'ic-brand-button--primary-bgd': '#1f3c6c',
      'ic-brand-button--primary-text': '#ffffff',
      'ic-brand-font-color-dark': '#000000',
      'proto-nav-active-text': '#000000',
      'proto-nav-active-icon': '#1f3c6c',
    },
  },
}

// the plain canvas look when there is no ?theme: no logo, the standard nav icons, canvas's own colors
const neutral = {
  name: 'default',
  logo: null,
  nav: [
    { label: 'Account', avatar: true },
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Courses', icon: 'courses' },
    { label: 'Calendar', icon: 'calendar' },
    { label: 'Inbox', icon: 'inbox' },
    { label: 'Help', icon: 'question' },
  ],
  vars: {
    'ic-brand-global-nav-bgd': '#394b58',
    'ic-link-color': '#0374b5',
    'ic-brand-font-color-dark': '#273540',
  },
}

export const images = { avatar, commons, my_media: myMedia }

// ?theme=gt or ?theme=du picks the school, anything else is the plain canvas look
// URLSearchParams docs: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
export function brandFromUrl() {
  const name = new URLSearchParams(window.location.search).get('theme')
  return brands[name] || neutral
}

// the instui theme is the canvas theme with the school's colors on top
export function instuiTheme(brand) {
  return brand === neutral ? canvas : { ...canvas, ...brand.vars }
}
