export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        badge: {
            variant: "info",
            text: "menuitems.dashboards.badge"
        },
        link: "/"
        /*subItems: [
            {
                id: 3,
                label: "menuitems.dashboards.list.default",
                link: "/",
                parentId: 2
            },
            {
                id: 4,
                label: "menuitems.dashboards.list.saas",
                link: "/dashboard/saas",
                parentId: 2
            },
            {
                id: 5,
                label: "menuitems.dashboards.list.crypto",
                link: "/dashboard/crypto",
                parentId: 2
            }
        ]*/
    },
    // {
    //     id: 6,
    //     isLayout: true
    // },
    {
        id: 3,
        label: "menuitems.content.text",
        icon: "bx-detail",
        subItems: [
            {
                id: 4,
                label: "menuitems.content.list.pages",
                link: "/content/pages",
                parentId: 3
            },
            {
                id: 5,
                label: "menuitems.content.list.blocks",
                link: "/content/blocks",
                parentId: 3
            }
        ]
    },
    {
        id: 6,
        label: "menuitems.catalog.text",
        icon: "bx-store",
        subItems: [
            {
                id: 7,
                label: "menuitems.catalog.list.categories",
                link: "/catalog/categories",
                parentId: 6
            },
            {
                id: 8,
                label: "menuitems.catalog.list.products",
                link: "/catalog/products",
                parentId: 6
            },
            {
                id: 8,
                label: "menuitems.catalog.list.attributes",
                link: "/catalog/attributes",
                parentId: 6
            }
        ]
    },
    {
        id: 9,
        label: "menuitems.sales.text",
        icon: "bx-money",
        subItems: [
            {
                id: 10,
                label: "menuitems.sales.list.orders",
                link: "/sales/orders",
                parentId: 9
            },
            {
                id: 11,
                label: "menuitems.sales.list.invoices",
                link: "/sales/invoices",
                parentId: 9
            },
            {
                id: 12,
                label: "menuitems.sales.list.shipments",
                link: "/sales/shipments",
                parentId: 9
            },
            {
                id: 13,
                label: "menuitems.sales.list.reports",
                link: "/sales/reports",
                parentId: 9
            }
        ]
    },
    {
        id: 14,
        label: "menuitems.customers.text",
        icon: "bx-user",
        subItems: [
            {
                id: 15,
                label: "menuitems.customers.list.customers",
                link: "/customers",
                parentId: 14
            },
            {
                id: 16,
                label: "menuitems.customers.list.customergroups",
                link: "/customers/groups",
                parentId: 14
            },
        ]
    },
    {
        id: 17,
        label: "menuitems.analytics.text",
        icon: "bx-stats",
        subItems: [
            {
                id: 18,
                label: "menuitems.analytics.list.analytics",
                link: "/analytics",
                parentId: 17
            },
            {
                id: 19,
                label: "menuitems.analytics.list.metatags",
                link: "/analytics/metatags",
                parentId: 17
            },
            {
                id: 20,
                label: "menuitems.analytics.list.sitemap",
                link: "/analytics/sitemap",
                parentId: 17
            },
            {
                id: 21,
                label: "menuitems.analytics.list.settings",
                link: "/analytics/settings",
                parentId: 17
            },
        ]
    },
    {
        id: 22,
        label: "menuitems.marketing.text",
        icon: "bx-mail-send",
        subItems: [
            {
                id: 23,
                label: "menuitems.marketing.list.campaigns",
                link: "/marketing/campaigns",
                parentId: 22
            },
            {
                id: 24,
                label: "menuitems.marketing.list.subscribers",
                link: "/marketing/subscribers",
                parentId: 22
            },
            {
                id: 25,
                label: "menuitems.marketing.list.emailtemplates",
                link: "/marketing/store-email-templates",
                parentId: 22
            },
        ]
    },
    {
        id: 26,
        label: "menuitems.settings.text",
        icon: "bx-cog",
        subItems: [
            {
                id: 27,
                label: "menuitems.settings.list.configuration",
                link: "/settings/configuration",
                parentId: 26
            },
            {
                id: 28,
                label: "menuitems.settings.list.design",
                link: "/settings/design",
                parentId: 26
            },
            {
                id: 29,
                label: "menuitems.settings.list.domains",
                link: "/settings/domains",
                parentId: 26
            },
            {
                id: 30,
                label: "menuitems.settings.list.usermanagement",
                link: "/settings/users",
                parentId: 26
            },
        ]
    },
    {
        id: 31,
        label: "menuitems.store.text",
        icon: "bx-link-external",
        link: "/frontend"
    },
    {
        id: 32,
        label: "menuitems.extensions.text",
        isTitle: true
    },
    {
        id: 33,
        label: "menuitems.chat.text",
        icon: "bx-chat",
        link: "/chat",
    },
    {
        id: 34,
        label: "menuitems.email.text",
        icon: "bx-envelope",
        subItems: [
            {
                id: 35,
                label: "menuitems.email.list.inbox",
                link: "/email/inbox",
                parentId: 34
            },
            {
                id: 36,
                label: "menuitems.email.list.reademail",
                link: "/email/reademail/1",
                parentId: 34
            }
        ]
    },
    {
        id: 37,
        label: "menuitems.calendar.text",
        icon: "bx-calendar",
        link: "/calendar"
    },
    {
        id: 38,
        label: "menuitems.extensions.list.add",
        icon: "bx-plug",
        link: "/extensions"
    },
    
    
    
    // {
    //     id: 7,
    //     label: "menuitems.apps.text",
    //     isTitle: true
    // },
    // {
    //     id: 8,
    //     label: "menuitems.calendar.text",
    //     icon: "bx-calendar",
    //     link: "/calendar"
    // },
    // {
    //     id: 90,
    //     label: "menuitems.chat.text",
    //     icon: "bx-chat",
    //     link: "/chat",
    //     badge: {
    //         variant: "success",
    //         text: "menuitems.chat.badge"
    //     }
    // },
    // {
    //     id: 100,
    //     label: "menuitems.ecommerce.text",
    //     icon: "bx-store",
    //     subItems: [
    //         {
    //             id: 110,
    //             label: "menuitems.ecommerce.list.products",
    //             link: "/ecommerce/products",
    //             parentId: 100
    //         },
    //         {
    //             id: 120,
    //             label: "menuitems.ecommerce.list.productdetail",
    //             link: "/ecommerce/product-detail/1",
    //             parentId: 100
    //         },
    //         {
    //             id: 130,
    //             label: "menuitems.ecommerce.list.orders",
    //             link: "/ecommerce/orders",
    //             parentId: 100
    //         },
    //         {
    //             id: 140,
    //             label: "menuitems.ecommerce.list.customers",
    //             link: "/ecommerce/customers",
    //             parentId: 100
    //         },
    //         {
    //             id: 150,
    //             label: "menuitems.ecommerce.list.cart",
    //             link: "/ecommerce/cart",
    //             parentId: 100
    //         },
    //         {
    //             id: 160,
    //             label: "menuitems.ecommerce.list.checkout",
    //             link: "/ecommerce/checkout",
    //             parentId: 100
    //         },
    //         {
    //             id: 170,
    //             label: "menuitems.ecommerce.list.shops",
    //             link: "/ecommerce/shops",
    //             parentId: 100
    //         },
    //         {
    //             id: 180,
    //             label: "menuitems.ecommerce.list.addproduct",
    //             link: "/ecommerce/add-product",
    //             parentId: 100
    //         }
    //     ]
    // },
    // {
    //     id: 190,
    //     label: "menuitems.crypto.text",
    //     icon: "bx-bitcoin",
    //     subItems: [
    //         {
    //             id: 200,
    //             label: "menuitems.crypto.list.wallet",
    //             link: "/crypto/wallet",
    //             parentId: 190
    //         },
    //         {
    //             id: 210,
    //             label: "menuitems.crypto.list.buy/sell",
    //             link: "/crypto/buy-sell",
    //             parentId: 190
    //         },
    //         {
    //             id: 220,
    //             label: "menuitems.crypto.list.exchange",
    //             link: "/crypto/exchange",
    //             parentId: 190
    //         },
    //         {
    //             id: 230,
    //             label: "menuitems.crypto.list.lending",
    //             link: "/crypto/lending",
    //             parentId: 190
    //         },
    //         {
    //             id: 240,
    //             label: "menuitems.crypto.list.orders",
    //             link: "/crypto/orders",
    //             parentId: 190
    //         },
    //         {
    //             id: 250,
    //             label: "menuitems.crypto.list.kycapplication",
    //             link: "/crypto/kyc-application",
    //             parentId: 190
    //         },
    //         {
    //             id: 260,
    //             label: "menuitems.crypto.list.icolanding",
    //             link: "/crypto/ico-landing",
    //             parentId: 190
    //         }
    //     ]
    // },
    // {
    //     id: 270,
    //     label: "menuitems.email.text",
    //     icon: "bx-envelope",
    //     subItems: [
    //         {
    //             id: 280,
    //             label: "menuitems.email.list.inbox",
    //             link: "/email/inbox",
    //             parentId: 270
    //         },
    //         {
    //             id: 290,
    //             label: "menuitems.email.list.reademail",
    //             link: "/email/reademail/1",
    //             parentId: 270
    //         }
    //     ]
    // },
    // {
    //     id: 300,
    //     label: "menuitems.invoices.text",
    //     icon: "bx-receipt",
    //     subItems: [
    //         {
    //             id: 310,
    //             label: "menuitems.invoices.list.invoicelist",
    //             link: "/invoices/list",
    //             parentId: 300
    //         },
    //         {
    //             id: 320,
    //             label: "menuitems.invoices.list.invoicedetail",
    //             link: "/invoices/detail",
    //             parentId: 300
    //         }
    //     ]
    // },
    // {
    //     id: 330,
    //     label: "menuitems.projects.text",
    //     icon: "bx-briefcase-alt-2",
    //     subItems: [
    //         {
    //             id: 340,
    //             label: "menuitems.projects.list.grid",
    //             link: "/projects/grid",
    //             parentId: 330
    //         },
    //         {
    //             id: 350,
    //             label: "menuitems.projects.list.projectlist",
    //             link: "/projects/list",
    //             parentId: 330
    //         },
    //         {
    //             id: 360,
    //             label: "menuitems.projects.list.overview",
    //             link: "/projects/overview",
    //             parentId: 330
    //         },
    //         {
    //             id: 370,
    //             label: "menuitems.projects.list.create",
    //             link: "/projects/create",
    //             parentId: 330
    //         }
    //     ]
    // },
    // {
    //     id: 380,
    //     label: "menuitems.tasks.text",
    //     icon: "bx-task",
    //     subItems: [
    //         {
    //             id: 390,
    //             label: "menuitems.tasks.list.tasklist",
    //             link: "/tasks/list",
    //             parentId: 380
    //         },
    //         {
    //             id: 400,
    //             label: "menuitems.tasks.list.kanban",
    //             link: "/tasks/kanban",
    //             parentId: 380
    //         },
    //         {
    //             id: 410,
    //             label: "menuitems.tasks.list.createtask",
    //             link: "/tasks/create",
    //             parentId: 380
    //         }
    //     ]
    // },
    // {
    //     id: 420,
    //     label: "menuitems.contacts.text",
    //     icon: "bxs-user-detail",
    //     subItems: [
    //         {
    //             id: 430,
    //             label: "menuitems.contacts.list.usergrid",
    //             link: "/contacts/grid",
    //             parentId: 420
    //         },
    //         {
    //             id: 440,
    //             label: "menuitems.contacts.list.userlist",
    //             link: "/contacts/list",
    //             parentId: 420
    //         },
    //         {
    //             id: 450,
    //             label: "menuitems.contacts.list.profile",
    //             link: "/contacts/profile",
    //             parentId: 420
    //         }
    //     ]
    // },
    // {
    //     id: 460,
    //     label: "menuitems.pages.text",
    //     isTitle: true
    // },
    // {
    //     id: 470,
    //     label: "menuitems.authentication.text",
    //     icon: "bx-user-circle",
    //     subItems: [
    //         {
    //             id: 480,
    //             label: "menuitems.authentication.list.login",
    //             link: "/auth/login-1",
    //             parentId: 470
    //         },
    //         {
    //             id: 490,
    //             label: "menuitems.authentication.list.register",
    //             link: "/auth/register-1",
    //             parentId: 470
    //         },
    //         {
    //             id: 500,
    //             label: "menuitems.authentication.list.recoverpwd",
    //             link: "/auth/recoverpwd",
    //             parentId: 470
    //         },
    //         {
    //             id: 510,
    //             label: "menuitems.authentication.list.lockscreen",
    //             link: "/auth/lock-screen",
    //             parentId: 470
    //         }
    //     ]
    // },
    // {
    //     id: 520,
    //     label: "menuitems.utility.text",
    //     icon: "bx-file",
    //     subItems: [
    //         {
    //             id: 530,
    //             label: "menuitems.utility.list.starter",
    //             link: "/pages/starter",
    //             parentId: 520
    //         },
    //         {
    //             id: 540,
    //             label: "menuitems.utility.list.maintenance",
    //             link: "/pages/maintenance",
    //             parentId: 520
    //         },
    //         {
    //             id: 550,
    //             label: "menuitems.utility.list.timeline",
    //             link: "/pages/timeline",
    //             parentId: 520
    //         },
    //         {
    //             id: 560,
    //             label: "menuitems.utility.list.faqs",
    //             link: "/pages/faqs",
    //             parentId: 520
    //         },
    //         {
    //             id: 570,
    //             label: "menuitems.utility.list.pricing",
    //             link: "/pages/pricing",
    //             parentId: 520
    //         },
    //         {
    //             id: 580,
    //             label: "menuitems.utility.list.error404",
    //             link: "/pages/404",
    //             parentId: 520
    //         },
    //         {
    //             id: 590,
    //             label: "menuitems.utility.list.error500",
    //             link: "/pages/500",
    //             parentId: 520
    //         }
    //     ]
    // },
    // {
    //     id: 600,
    //     label: "menuitems.components.text",
    //     isTitle: true
    // },
    // {
    //     id: 610,
    //     label: "menuitems.uielements.text",
    //     icon: "bx-tone",
    //     subItems: [
    //         {
    //             id: 620,
    //             label: "menuitems.uielements.list.alerts",
    //             link: "/ui/alerts",
    //             parentId: 610
    //         },
    //         {
    //             id: 630,
    //             label: "menuitems.uielements.list.buttons",
    //             link: "/ui/buttons",
    //             parentId: 610
    //         },
    //         {
    //             id: 640,
    //             label: "menuitems.uielements.list.cards",
    //             link: "/ui/cards",
    //             parentId: 610
    //         },
    //         {
    //             id: 650,
    //             label: "menuitems.uielements.list.carousel",
    //             link: "/ui/carousel",
    //             parentId: 610
    //         },
    //         {
    //             id: 660,
    //             label: "menuitems.uielements.list.dropdowns",
    //             link: "/ui/dropdowns",
    //             parentId: 610
    //         },
    //         {
    //             id: 670,
    //             label: "menuitems.uielements.list.grid",
    //             link: "/ui/grid",
    //             parentId: 610
    //         },
    //         {
    //             id: 680,
    //             label: "menuitems.uielements.list.images",
    //             link: "/ui/images",
    //             parentId: 610
    //         },
    //         {
    //             id: 690,
    //             label: "menuitems.uielements.list.modals",
    //             link: "/ui/modals",
    //             parentId: 610
    //         },
    //         {
    //             id: 700,
    //             label: "menuitems.uielements.list.rangeslider",
    //             link: "/ui/rangeslider",
    //             parentId: 610
    //         },
    //         {
    //             id: 710,
    //             label: "menuitems.uielements.list.progressbar",
    //             link: "/ui/progressbars",
    //             parentId: 610
    //         },
    //         {
    //             id: 720,
    //             label: "menuitems.uielements.list.sweetalert",
    //             link: "/ui/sweet-alert",
    //             parentId: 610
    //         },
    //         {
    //             id: 730,
    //             label: "menuitems.uielements.list.tabs",
    //             link: "/ui/tabs-accordions",
    //             parentId: 610
    //         },
    //         {
    //             id: 740,
    //             label: "menuitems.uielements.list.typography",
    //             link: "/ui/typography",
    //             parentId: 610
    //         },
    //         {
    //             id: 750,
    //             label: "menuitems.uielements.list.video",
    //             link: "/ui/video",
    //             parentId: 610
    //         },
    //         {
    //             id: 760,
    //             label: "menuitems.uielements.list.general",
    //             link: "/ui/general",
    //             parentId: 610
    //         },
    //         {
    //             id: 770,
    //             label: "menuitems.uielements.list.colors",
    //             link: "/ui/colors",
    //             parentId: 610
    //         },
    //         {
    //             id: 780,
    //             label: "menuitems.uielements.list.lightbox",
    //             link: "/ui/lightbox",
    //             parentId: 610
    //         },
    //         {
    //             id: 790,
    //             label: "menuitems.uielements.list.cropper",
    //             link: "/ui/image-cropper",
    //             parentId: 610
    //         }
    //     ]
    // },
    // {
    //     id: 790,
    //     label: "menuitems.forms.text",
    //     icon: "bxs-eraser",
    //     badge: {
    //         variant: "danger",
    //         text: 'menuitems.forms.badge'
    //     },
    //     subItems: [
    //         {
    //             id: 800,
    //             label: "menuitems.forms.list.elements",
    //             link: "/form/elements",
    //             parentId: 790
    //         },
    //         {
    //             id: 810,
    //             label: "menuitems.forms.list.layouts",
    //             link: "/form/layouts",
    //             parentId: 790
    //         },
    //         {
    //             id: 810,
    //             label: "menuitems.forms.list.validation",
    //             link: "/form/validation",
    //             parentId: 790
    //         },
    //         {
    //             id: 820,
    //             label: "menuitems.forms.list.advanced",
    //             link: "/form/advanced",
    //             parentId: 790
    //         },
    //         {
    //             id: 830,
    //             label: "menuitems.forms.list.editor",
    //             link: "/form/editor",
    //             parentId: 790
    //         },
    //         {
    //             id: 840,
    //             label: "menuitems.forms.list.fileupload",
    //             link: "/form/uploads",
    //             parentId: 790
    //         },
    //         {
    //             id: 850,
    //             label: "menuitems.forms.list.repeater",
    //             link: "/form/repeater",
    //             parentId: 790
    //         },
    //         {
    //             id: 860,
    //             label: "menuitems.forms.list.wizard",
    //             link: "/form/wizard",
    //             parentId: 790
    //         },
    //         {
    //             id: 870,
    //             label: "menuitems.forms.list.mask",
    //             link: "/form/mask",
    //             parentId: 790
    //         }
    //     ]
    // },
    // {
    //     id: 880,
    //     icon: "bx-list-ul",
    //     label: "menuitems.tables.text",
    //     subItems: [
    //         {
    //             id: 890,
    //             label: "menuitems.tables.list.basic",
    //             link: "/tables/basic",
    //             parentId: 880
    //         },
    //         {
    //             id: 900,
    //             label: "menuitems.tables.list.advanced",
    //             link: "/tables/advanced",
    //             parentId: 880
    //         }
    //     ]
    // },
    // {
    //     id: 910,
    //     icon: "bxs-bar-chart-alt-2",
    //     label: "menuitems.charts.text",
    //     subItems: [
    //         {
    //             id: 920,
    //             label: "menuitems.charts.list.apex",
    //             link: "/charts/apex",
    //             parentId: 910
    //         },
    //         {
    //             id: 930,
    //             label: "menuitems.charts.list.chartjs",
    //             link: "/charts/chartjs",
    //             parentId: 910
    //         },
    //         {
    //             id: 940,
    //             label: "menuitems.charts.list.chartist",
    //             link: "/charts/chartist",
    //             parentId: 910
    //         },
    //         {
    //             id: 950,
    //             label: "menuitems.charts.list.echart",
    //             link: "/charts/echart",
    //             parentId: 910
    //         }
    //     ]
    // },
    // {
    //     id: 960,
    //     label: "menuitems.icons.text",
    //     icon: "bx-aperture",
    //     subItems: [
    //         {
    //             id: 970,
    //             label: "menuitems.icons.list.boxicons",
    //             link: "/icons/boxicons",
    //             parentId: 960
    //         },
    //         {
    //             id: 980,
    //             label: "menuitems.icons.list.materialdesign",
    //             link: "/icons/materialdesign",
    //             parentId: 960
    //         },
    //         {
    //             id: 990,
    //             label: "menuitems.icons.list.dripicons",
    //             link: "/icons/dripicons",
    //             parentId: 960
    //         },
    //         {
    //             id: 1000,
    //             label: "menuitems.icons.list.fontawesome",
    //             link: "/icons/fontawesome",
    //             parentId: 960
    //         }
    //     ]
    // },
    // {
    //     id: 1010,
    //     label: "menuitems.maps.text",
    //     icon: "bx-map",
    //     subItems: [
    //         {
    //             id: 1020,
    //             label: "menuitems.maps.list.googlemap",
    //             link: "/maps/google",
    //             parentId: 1010
    //         },
    //         {
    //             id: 1030,
    //             label: "menuitems.maps.list.leafletmap",
    //             link: "/maps/leaflet",
    //             parentId: 1010
    //         },
    //     ]
    // },
    // {
    //     id: 1040,
    //     label: "menuitems.multilevel.text",
    //     icon: "bx-share-alt",
    //     subItems: [
    //         {
    //             id: 1050,
    //             label: "menuitems.multilevel.list.level1.1",
    //             link: "javascript: void(0);",
    //             parentId: 1040
    //         },
    //         {
    //             id: 1060,
    //             label: "menuitems.multilevel.list.level1.2",
    //             parentId: 1040,
    //             subItems: [
    //                 {
    //                     id: 1070,
    //                     label: "menuitems.multilevel.list.level1.level2.1",
    //                     link: "javascript: void(0);",
    //                     parentId: 1060
    //                 },
    //                 {
    //                     id: 1080,
    //                     label: "menuitems.multilevel.list.level1.level2.2",
    //                     link: "/level2.2",
    //                     parentId: 1060
    //                 }
    //             ]
    //         }
    //     ]
    // }
];

