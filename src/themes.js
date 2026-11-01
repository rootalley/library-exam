import gtLogo from './assets/gt_logo.png'
import avatar from './assets/avatar-50.png'

// brand colors copied from devtools on the live canvas page (css custom properties on the dashboard)
export const brands = {
  gt: {
    name: 'gt',
    logo: gtLogo,
    nav: [
      { label: 'Account', avatar: true },
      { label: 'Dashboard', svg: `<svg class="ic-icon-svg ic-icon-svg--dashboard" viewBox="0 0 280 200"><path d="M273.09,180.75H197.47V164.47h62.62A122.16,122.16,0,1,0,17.85,142a124,124,0,0,0,2,22.51H90.18v16.29H6.89l-1.5-6.22A138.51,138.51,0,0,1,1.57,142C1.57,65.64,63.67,3.53,140,3.53S278.43,65.64,278.43,142a137.67,137.67,0,0,1-3.84,32.57ZM66.49,87.63,50.24,71.38,61.75,59.86,78,76.12Zm147,0L202,76.12l16.25-16.25,11.51,11.51ZM131.85,53.82v-23h16.29v23Zm15.63,142.3a31.71,31.71,0,0,1-28-16.81c-6.4-12.08-15.73-72.29-17.54-84.25a8.15,8.15,0,0,1,13.58-7.2c8.88,8.21,53.48,49.72,59.88,61.81a31.61,31.61,0,0,1-27.9,46.45ZM121.81,116.2c4.17,24.56,9.23,50.21,12,55.49A15.35,15.35,0,1,0,161,157.3C158.18,152,139.79,133.44,121.81,116.2Z"></path></svg>` },
      { label: 'Courses', svg: `<svg class="ic-icon-svg ic-icon-svg--courses" viewBox="0 0 280 259"><path d="M73.31,198c-11.93,0-22.22,8-24,18.73a26.67,26.67,0,0,0-.3,3.63v.3a22,22,0,0,0,5.44,14.65,22.47,22.47,0,0,0,17.22,8H200V228.19h-134V213.08H200V198Zm21-105.74h90.64V62H94.3ZM79.19,107.34V46.92H200v60.42Zm7.55,30.21V122.45H192.49v15.11ZM71.65,16.71A22.72,22.72,0,0,0,49,39.36V190.88a41.12,41.12,0,0,1,24.32-8h157V16.71ZM33.88,39.36A37.78,37.78,0,0,1,71.65,1.6H245.36V198H215.15v45.32h22.66V258.4H71.65a37.85,37.85,0,0,1-37.76-37.76Z"></path></svg>` },
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

export const images = { avatar }
