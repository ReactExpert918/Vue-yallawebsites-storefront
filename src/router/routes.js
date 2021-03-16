import store from '@/state/store'

export default [
  {
    path: '/',
    name: 'default',
    meta: {
      authRequired: true,
    },
    component: () => import('./views/dashboards/index'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/account/register'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('./views/account/forgot-password'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'default' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch('auth/logOut')
        } else {
          store.dispatch('authfack/logout')
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'default' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('./views/utility/404').default,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
  {
    path: '/content/pages',
    name: 'Pages',
    meta: { authRequired: true },
    component: () => import('./views/content/pages/pages')
  },
  {
    path: '/content/pages/add',
    name: 'Add Page',
    meta: { authRequired: true },
    component: () => import('./views/content/pages/add/add')
  },
  {
    path: '/content/pages/edit/:id',
    name: 'Edit Page',
    meta: { authRequired: true },
    component: () => import('./views/content/pages/edit/edit')
  },
  {
    path: '/content/blocks',
    name: 'Blocks',
    meta: { authRequired: true },
    component: () => import('./views/content/blocks/blocks')
  },
  {
    path: '/content/blocks/add',
    name: 'Add Block',
    meta: { authRequired: true },
    component: () => import('./views/content/blocks/add/add')
  },
  {
    path: '/content/blocks/edit/:id',
    name: 'Edit Block',
    meta: { authRequired: true },
    component: () => import('./views/content/blocks/edit/edit')
  },
  {
    path: '/catalog/categories',
    name: 'Categories',
    meta: { authRequired: true },
    component: () => import('./views/catalog/categories/categories')
  },
  {
    path: '/catalog/products',
    name: 'Products',
    meta: { authRequired: true },
    component: () => import('./views/catalog/products/products')
  },
  {
    path: '/catalog/products/add',
    name: 'Add Product',
    meta: { authRequired: true },
    component: () => import('./views/catalog/products/add/add')
  },
  {
    path: '/catalog/products/edit/:id',
    name: 'Edit Product',
    meta: { authRequired: true },
    props: true,
    component: () => import('./views/catalog/products/edit/edit')
  },
  {
    path: '/catalog/attributes',
    name: 'Product Attributes',
    meta: { authRequired: true },
    component: () => import('./views/catalog/attributes/attributes')
  },
  {
    path: '/sales/orders',
    name: 'Orders',
    meta: { authRequired: true },
    component: () => import('./views/sales/orders/orders')
  },
  {
    path: '/sales/orders/view/:id',
    name: 'View Order',
    meta: { authRequired: true },
    component: () => import('./views/sales/orders/view/view')
  },
  {
    path: '/sales/orders/create',
    name: 'Create Order',
    meta: { authRequired: true },
    component: () => import('./views/sales/orders/create/create')
  },
  {
    path: '/sales/orders/edit/:id',
    name: 'Edit Order',
    meta: { authRequired: true },
    component: () => import('./views/sales/orders/edit/edit')
  },
  {
    path: '/sales/invoices',
    name: 'Invoices',
    meta: { authRequired: true },
    component: () => import('./views/sales/invoices/invoices')
  },
  {
    path: '/sales/invoices/view/:id',
    name: 'View Invoice',
    meta: { authRequired: true },
    component: () => import('./views/sales/invoices/view/view')
  },
  {
    path: '/sales/shipments',
    name: 'Shipments',
    meta: { authRequired: true },
    component: () => import('./views/sales/shipments/shipments')
  },
  {
    path: '/sales/shipments/view/:id',
    name: 'View Shipment',
    meta: { authRequired: true },
    component: () => import('./views/sales/shipments/view/view')
  },
  {
    path: '/sales/reports',
    name: 'Reports',
    meta: { authRequired: true },
    component: () => import('./views/sales/reports/reports')
  },
  {
    path: '/customers',
    name: 'Customers',
    meta: { authRequired: true },
    component: () => import('./views/customers/customers')
  },
  {
    path: '/customers/edit/:id',
    name: 'Edit Customer',
    meta: { authRequired: true },
    component: () => import('./views/customers/edit/edit')
  },
  {
    path: '/customers/create',
    name: 'Create Customer',
    meta: { authRequired: true },
    component: () => import('./views/customers/create/create')
  },
  {
    path: '/customers/groups',
    name: 'Customer Groups',
    meta: { authRequired: true },
    component: () => import('./views/customers/customer-groups')
  },
  {
    path: '/analytics',
    name: 'Analytics',
    meta: { authRequired: true },
    component: () => import('./views/analytics/analytics/analytics')
  },
  {
    path: '/analytics/metatags',
    name: 'Meta',
    meta: { authRequired: true },
    component: () => import('./views/analytics/meta/meta')
  },
  {
    path: '/analytics/sitemap',
    name: 'Site Map',
    meta: { authRequired: true },
    component: () => import('./views/analytics/sitemap/sitemap')
  },
  {
    path: '/analytics/settings',
    name: 'Analytics Settings',
    meta: { authRequired: true },
    component: () => import('./views/analytics/settings/settings')
  },
  {
    path: '/marketing/campaigns',
    name: 'Email Campaigns',
    meta: { authRequired: true },
    component: () => import('./views/marketing/email-campaigns/campaigns')
  },
  {
    path: '/marketing/subscribers',
    name: 'Email Subscribers',
    meta: { authRequired: true },
    component: () => import('./views/marketing/email-subscribers/subscribers')
  },
  {
    path: '/marketing/store-email-templates',
    name: 'Store Email Templates',
    meta: { authRequired: true },
    component: () => import('./views/marketing/store-email-templates/store-email-templates')
  },
  {
    path: '/settings/configuration',
    name: 'Configuration',
    meta: { authRequired: true },
    component: () => import('./views/settings/configuration/configuration')
  },
  {
    path: '/settings/design',
    name: 'Design',
    meta: { authRequired: true },
    component: () => import('./views/settings/design/design')
  },
  {
    path: '/settings/domains',
    name: 'Domains',
    meta: { authRequired: true },
    component: () => import('./views/settings/domains/domains')
  },
  {
    path: '/settings/users',
    name: 'Users',
    meta: { authRequired: true },
    component: () => import('./views/settings/users/users')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: { authRequired: true },
    component: () => import('./views/calendar/calendar')
  },
  {
    path: '/chat',
    name: 'chat',
    meta: { authRequired: true },
    component: () => import('./views/chat/index')
  },
  {
    path: '/ui/alerts',
    name: 'Alerts',
    meta: {
      authRequired: true
    },
    component: () => import('./views/ui/alerts')
  },
  {
    path: '/ui/buttons',
    name: 'Buttons',
    meta: {
      authRequired: true
    },
    component: () => import('./views/ui/buttons')
  },
  {
    path: '/ui/cards',
    name: 'Cards',
    meta: { authRequired: true },
    component: () => import('./views/ui/cards')
  },
  {
    path: '/ui/carousel',
    name: 'Carousel',
    meta: { authRequired: true },
    component: () => import('./views/ui/carousel')
  },
  {
    path: '/ui/dropdowns',
    name: 'Dropdowns',
    meta: { authRequired: true },
    component: () => import('./views/ui/dropdowns')
  },
  {
    path: '/ui/grid',
    name: 'Grid',
    meta: { authRequired: true },
    component: () => import('./views/ui/grid')
  },
  {
    path: '/ui/images',
    name: 'Images',
    meta: { authRequired: true },
    component: () => import('./views/ui/images')
  },
  {
    path: '/ui/modals',
    name: 'Modals',
    meta: { authRequired: true },
    component: () => import('./views/ui/modals')
  },
  {
    path: '/ui/rangeslider',
    name: 'Rangeslider',
    meta: { authRequired: true },
    component: () => import('./views/ui/rangeslider')
  },
  {
    path: '/ui/progressbars',
    name: 'Progressbars',
    meta: { authRequired: true },
    component: () => import('./views/ui/progressbars')
  },
  {
    path: '/ui/sweet-alert',
    name: 'Sweet-alert',
    meta: { authRequired: true },
    component: () => import('./views/ui/sweet-alert')
  },
  {
    path: '/ui/tabs-accordions',
    name: 'Tabs-accordions',
    meta: { authRequired: true },
    component: () => import('./views/ui/tabs-accordions')
  },
  {
    path: '/ui/typography',
    name: 'Typography',
    meta: { authRequired: true },
    component: () => import('./views/ui/typography')
  },
  {
    path: '/ui/video',
    name: 'Video',
    meta: { authRequired: true },
    component: () => import('./views/ui/video')
  },
  {
    path: '/ui/general',
    name: 'General',
    meta: { authRequired: true },
    component: () => import('./views/ui/general')
  },
  {
    path: '/ui/colors',
    name: 'Colors',
    meta: { authRequired: true },
    component: () => import('./views/ui/colors')
  },
  {
    path: '/ui/lightbox',
    name: 'Lightbox',
    meta: { authRequired: true },
    component: () => import('./views/ui/lightbox')
  },
  {
    path: '/ui/image-cropper',
    name: 'Image Cropper',
    meta: { authRequired: true },
    component: () => import('./views/ui/cropper')
  },
  {
    path: '/icons/boxicons',
    name: 'Boxicons Icon',
    meta: { authRequired: true },
    component: () => import('./views/icons/boxicons')
  },
  {
    path: '/icons/materialdesign',
    name: 'Materialdesign Icon',
    meta: { authRequired: true },
    component: () => import('./views/icons/materialdesign')
  },
  {
    path: '/icons/dripicons',
    name: 'Dripicons Icon',
    meta: { authRequired: true },
    component: () => import('./views/icons/dripicons')
  },
  {
    path: '/icons/fontawesome',
    name: 'Fontawesome Icon',
    meta: { authRequired: true },
    component: () => import('./views/icons/fontawesome')
  },
  {
    path: '/tables/basic',
    name: 'Basic Tables',
    meta: { authRequired: true },
    component: () => import('./views/tables/basictable')
  },
  {
    path: '/tables/advanced',
    name: 'Advanced Tables',
    meta: { authRequired: true },
    component: () => import('./views/tables/advancedtable')
  },
  {
    path: '/form/advanced',
    name: 'Form Advanced',
    meta: { authRequired: true },
    component: () => import('./views/forms/advanced')
  },
  {
    path: '/form/elements',
    name: 'Form Elements',
    meta: { authRequired: true },
    component: () => import('./views/forms/elements')
  },
  {
    path: '/form/layouts',
    name: 'Form Layouts',
    meta: { authRequired: true },
    component: () => import('./views/forms/layouts')
  },
  {
    path: '/form/editor',
    name: 'Form Editors',
    meta: { authRequired: true },
    component: () => import('./views/forms/editors')
  },
  {
    path: '/form/uploads',
    name: 'File Uploads',
    meta: { authRequired: true },
    component: () => import('./views/forms/uploads')
  },
  {
    path: '/form/validation',
    name: 'Form Validation',
    meta: { authRequired: true },
    component: () => import('./views/forms/validation')
  },
  {
    path: '/form/wizard',
    name: 'Form Wizard',
    meta: { authRequired: true },
    component: () => import('./views/forms/wizard')
  },
  {
    path: '/form/repeater',
    name: 'Form Repeater',
    meta: { authRequired: true },
    component: () => import('./views/forms/repeater')
  },
  {
    path: '/form/mask',
    name: 'Form Mask',
    meta: { authRequired: true },
    component: () => import('./views/forms/mask')
  },
  {
    path: '/pages/starter',
    name: 'Starter',
    meta: { authRequired: true },
    component: () => import('./views/utility/starter')
  },
  {
    path: '/pages/maintenance',
    name: 'Maintenance',
    meta: { authRequired: true },
    component: () => import('./views/utility/maintenance')
  },
  {
    path: '/pages/timeline',
    name: 'Timeline',
    meta: { authRequired: true },
    component: () => import('./views/utility/timeline')
  },
  {
    path: '/pages/faqs',
    name: 'FAQs',
    meta: { authRequired: true },
    component: () => import('./views/utility/faqs')
  },
  {
    path: '/pages/pricing',
    name: 'Pricing',
    meta: { authRequired: true },
    component: () => import('./views/utility/pricing')
  },
  {
    path: '/pages/404',
    name: 'Error-404',
    meta: { authRequired: true },
    component: () => import('./views/utility/404')
  },
  {
    path: '/pages/500',
    name: 'Error-500',
    meta: { authRequired: true },
    component: () => import('./views/utility/500')
  },
  {
    path: '/email/inbox',
    name: 'Inbox',
    meta: { authRequired: true },
    component: () => import('./views/email/inbox')
  },
  {
    path: '/email/reademail/:id',
    name: 'Read Email',
    meta: { authRequired: true },
    component: () => import('./views/email/reademail')
  },
]
