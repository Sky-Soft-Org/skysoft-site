// Real screens from Sky Soft's live sites, captured at 1440×900 (computer)
// and 390×844 (phone). Long pages scroll inside their frame. A product with
// `frames` steps through those extra screens in turn, like someone clicking
// through the app; a single one-screen capture settles with a slow zoom.
import wearDesktop from '../assets/showcase/wear-desktop.webp';
import wearDesktopTop from '../assets/showcase/wear-desktop-top.webp';
import wearMobile from '../assets/showcase/wear-mobile.webp';
import wearMobileTop from '../assets/showcase/wear-mobile-top.webp';
import wearMobileBottom from '../assets/showcase/wear-mobile-bottom.webp';
import marketDesktop from '../assets/showcase/market-desktop.webp';
import marketDesktopTop from '../assets/showcase/market-desktop-top.webp';
import marketMobile from '../assets/showcase/market-mobile.webp';
import marketMobileTop from '../assets/showcase/market-mobile-top.webp';
import marketMobileBottom from '../assets/showcase/market-mobile-bottom.webp';
import restDesktopHalls from '../assets/showcase/rest-desktop-halls.webp';
import restDesktopTables from '../assets/showcase/rest-desktop-tables.webp';
import restDesktopOrders from '../assets/showcase/rest-desktop-orders.webp';
import restMobileHalls from '../assets/showcase/rest-mobile-halls.webp';
import restMobileTables from '../assets/showcase/rest-mobile-tables.webp';
import restMobileOrders from '../assets/showcase/rest-mobile-orders.webp';
import reportsDesktopDashboard from '../assets/showcase/reports-desktop-dashboard.webp';
import reportsDesktopCatalog from '../assets/showcase/reports-desktop-catalog.webp';
import reportsDesktopItems from '../assets/showcase/reports-desktop-items.webp';
import reportsMobileDashboard from '../assets/showcase/reports-mobile-dashboard.webp';
import reportsMobileCatalog from '../assets/showcase/reports-mobile-catalog.webp';
import reportsMobileItems from '../assets/showcase/reports-mobile-items.webp';

// Visible height ÷ width of each frame's screen
export const DESKTOP_RATIO = 900 / 1440;
export const PHONE_RATIO = 844 / 390;

export const SHOWCASE = [
  {
    id: 'wear', name: 'wear.title', kind: 'live.wear.kind', desc: 'live.wear.desc', open: 'live.openStore',
    url: 'https://skywear.skysoft-erb.com',
    seconds: 11,
    desktop: { src: wearDesktop, w: 1440, h: 3470, top: wearDesktopTop, topH: 109 },
    phone: { src: wearMobile, w: 560, h: 3547, top: wearMobileTop, topH: 82, bottom: wearMobileBottom, bottomH: 88 },
  },
  {
    id: 'market', name: 'p3.title', kind: 'live.market.kind', desc: 'live.market.desc', open: 'live.openStore',
    url: 'https://market-dev.skysoft-erb.com',
    seconds: 10,
    desktop: { src: marketDesktop, w: 1440, h: 2455, top: marketDesktopTop, topH: 107 },
    phone: { src: marketMobile, w: 560, h: 2625, top: marketMobileTop, topH: 72, bottom: marketMobileBottom, bottomH: 88 },
  },
  {
    id: 'restaurant', name: 'rest.title', kind: 'live.rest.kind', desc: 'live.rest.desc', open: 'live.openSignIn',
    url: 'https://rest-dev.skysoft-erb.com',
    seconds: 10.5,
    // Halls, then Tables, then Orders, as a waiter would move through them
    desktop: { src: restDesktopHalls, w: 1440, h: 900, frames: [restDesktopTables, restDesktopOrders] },
    phone: { src: restMobileHalls, w: 560, h: 1212, frames: [restMobileTables, restMobileOrders] },
  },
  {
    id: 'reports', name: 'nav.reports', kind: 'live.reports.kind', desc: 'live.reports.desc', open: 'live.openSignIn',
    url: 'https://reports.skysoft-erb.com',
    seconds: 10.5,
    // Dashboard, then the list of reports, then one report (the item list).
    // A real client's database: names and amounts were blurred before capture.
    desktop: { src: reportsDesktopDashboard, w: 1440, h: 900, frames: [reportsDesktopCatalog, reportsDesktopItems] },
    phone: { src: reportsMobileDashboard, w: 560, h: 1212, frames: [reportsMobileCatalog, reportsMobileItems] },
  },
];

// Every image the section shows, so it can fetch them all before a visitor gets there
export const SHOWCASE_IMAGES = SHOWCASE.flatMap(({ desktop, phone }) =>
  [desktop, phone].flatMap((s) => [s.src, s.top, s.bottom, ...(s.frames || [])]).filter(Boolean),
);
