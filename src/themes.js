import gtLogo from './assets/gt_logo.png'
import avatar from './assets/avatar-50.png'
import myMedia from './assets/my_media.png'
import gtNav from './brands/gt.json'

// brand colors copied from devtools on the live canvas page (css custom properties on the dashboard)
export const brands = {
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
}

export const images = { avatar, my_media: myMedia }
