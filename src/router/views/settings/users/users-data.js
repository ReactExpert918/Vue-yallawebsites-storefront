const usersData = [
  {
    id: 1,
    name: 'User 1',
    email: 'myemail.com',
    username: 'user1',
    status: 'Enabled',
    role: {
      id: 1,
      name: "Admin",
      slug: "admin",
      created_at: "dsfdsf"
    },
    customRoleOptions: [
      {
        id: 1,
        customRoleOption: '',
      }
    ],
  },
  {
    id: 2,
    name: 'User 2',
    email: 'myemail.com',
    username: 'user2',
    status: 'Enabled',
    role: 'Editor',
  }
];
const adminCategoriesData = [
  {
    id: 1,
    name: 'Dashboard',
  },
  {
    id: 2,
    name: 'Content',
    subCats: [
      {
        id: 1,
        name: 'Pages',
      },
      {
        id: 2,
        name: 'Blocks',
      }
    ],
  },
  {
    id: 3,
    name: 'Catalog',
    subCats: [
      {
        id: 1,
        name: 'Categories',
      },
      {
        id: 2,
        name: 'Products',
      },
      {
        id: 3,
        name: 'Attributes',
      },
    ],
  },
  {
    id: 4,
    name: 'Sales',
    subCats: [
      {
        id: 1,
        name: 'Orders',
      },
      {
        id: 2,
        name: 'Invoices',
      },
      {
        id: 3,
        name: 'Shipments',
      },
      {
        id: 4,
        name: 'Reports',
      },
    ],
  },
  {
    id: 5,
    name: 'Customers',
    subCats: [
      {
        id: 1,
        name: 'Customers',
      },
      {
        id: 2,
        name: 'Customer Groups',
      }
    ],
  },
  {
    id: 6,
    name: 'Analytics',
    subCats: [
      {
        id: 1,
        name: 'Analytics',
      },
      {
        id: 2,
        name: 'Meta Tags',
      },
      {
        id: 3,
        name: 'Sitemap',
      },
      {
        id: 4,
        name: 'Settings',
      }
    ],
  },
  {
    id: 7,
    name: 'Marketing',
    subCats: [
      {
        id: 1,
        name: 'Email Campaigns',
      },
      {
        id: 2,
        name: 'Email Subscribers',
      },
      {
        id: 3,
        name: 'Store Email Templates',
      }
    ],
  },
  {
    id: 8,
    name: 'Settings',
    subCats: [
      {
        id: 1,
        name: 'Configuration',
      },
      {
        id: 2,
        name: 'Designs',
      },
      {
        id: 3,
        name: 'Domains',
      },
      {
        id: 4,
        name: 'User Management',
      }
    ],
  },
];
export { usersData, adminCategoriesData };
