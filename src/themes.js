import gtLogo from './assets/gt_logo.png'

// brand colors copied from devtools on the live canvas page (css custom properties on the dashboard)
export const brands = {
  gt: {
    name: 'gt',
    logo: gtLogo,
    nav: [
      { label: 'Account' },
      { label: 'Dashboard' },
      { label: 'Courses' },
      { label: 'Groups' },
      { label: 'Calendar' },
      { label: 'Inbox' },
      { label: 'History' },
      { label: 'My Media' },
      { label: 'Help' },
    ],
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
