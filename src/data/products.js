// Sky Soft's products. Sky Soft ERP is the main system; the other four
// work on their own and connect to it. `icon` names come from Icon.jsx.
// `site` is the product's live web address, linked from its card.
export const ERP = {
  id: 'erp', icon: 'monitor', title: 'erp.title', tag: 'erp.tag', desc: 'erp.desc',
  // Taken from the ERP's own menu bar and favourites
  modules: ['erp.mod1', 'erp.mod2', 'erp.mod3', 'erp.mod4', 'erp.mod5', 'erp.mod6', 'erp.mod7', 'erp.mod8', 'erp.mod9', 'erp.mod10'],
  link: { whatsapp: true, label: 'erp.more' },
};

export const PRODUCTS = [
  {
    id: 'reports', icon: 'chart', title: 'nav.reports', tag: 'p2.tag', desc: 'p2.desc',
    features: ['p2.f1', 'p2.f2', 'p2.f3'],
    link: { href: '#reports', label: 'p2.more' },
    site: 'https://reports.skysoft-erb.com',
  },
  {
    id: 'sales', icon: 'device', title: 'sales.title', tag: 'sales.tag', desc: 'sales.desc',
    features: ['sales.f1', 'sales.f2', 'sales.f3'],
    link: { whatsapp: true, label: 'sales.more' },
  },
  {
    id: 'market', icon: 'cart', title: 'p3.title', tag: 'p3.tag', desc: 'p3.desc',
    features: ['p3.f1', 'p3.f2', 'p3.f3'],
    link: { href: '#marketplace', label: 'p3.more' },
    site: 'https://market-dev.skysoft-erb.com',
  },
  {
    id: 'wear', icon: 'shirt', title: 'wear.title', tag: 'wear.tag', desc: 'wear.desc',
    features: ['wear.f1', 'wear.f2', 'wear.f3'],
    link: { whatsapp: true, label: 'wear.more' },
    site: 'https://skywear.skysoft-erb.com',
  },
  {
    id: 'restaurant', icon: 'utensils', title: 'rest.title', tag: 'rest.tag', desc: 'rest.desc',
    features: ['rest.f1', 'rest.f2', 'rest.f3'],
    link: { whatsapp: true, label: 'rest.more' },
    site: 'https://rest-dev.skysoft-erb.com',
  },
];

export const ALL_PRODUCTS = [ERP, ...PRODUCTS];
