const customerData = [
  {
    id: 1,
    first_name: 'Michael Figg',
    last_name: 'Figg',
    email: 'michael@nvera.com',
    group: {
      id: 1,
      name: "General",
      CreatedAt: "2020/12/12"
    },
    newsletter_subscriber: true,

    billingAddresses: [{
      billingAddressCustomerName: 'John Doe',
      billingAddressStreetAddress: '14 street address 1',
      billingAddressCity: 'London',
      billingAddressPostCodeZip: 'W1J7BU',
      billingAddressCountry: 'England',
      billingAddressTelephoneNumber: '02138318922',
    },
    {
      billingAddressCustomerName: 'John Doe',
      billingAddressStreetAddress: '14 street address 1',
      billingAddressCity: 'London',
      billingAddressPostCodeZip: 'W1J7BU',
      billingAddressCountry: 'England',
      billingAddressTelephoneNumber: '02138318922',
    }
    ],
    shippingAddresses: [{

      shippingAddressCustomerName: 'John Doe',
      shippingAddressStreetAddress: '14 street address 1',
      shippingAddressCity: 'London',
      shippingAddressPostCodeZip: 'W1J7BU',
      shippingAddressCountry: 'England',
      shippingAddressTelephoneNumber: '02138318922',

    },
    {

      shippingAddressCustomerName: 'John Doe',
      shippingAddressStreetAddress: '14 street address 1',
      shippingAddressCity: 'London',
      shippingAddressPostCodeZip: 'W1J7BU',
      shippingAddressCountry: 'England',
      shippingAddressTelephoneNumber: '02138318922',

    }
    ],
    previousOrders: [
      {
        id: 1,
        orderId: 12313,
        purchaseDate: '12/12/12',
        noOfProducts: 231,
        totalPrice: 23.32,
      },
      {
        id: 2,
        orderId: 12313,
        purchaseDate: '12/12/12',
        noOfProducts: 231,
        totalPrice: 23.32,
      },
      {
        id: 3,
        orderId: 12313,
        purchaseDate: '12/12/12',
        noOfProducts: 231,
        totalPrice: 23.32,
      },
      {
        id: 4,
        orderId: 12313,
        purchaseDate: '12/12/12',
        noOfProducts: 231,
        totalPrice: 23.32,
      },
      {
        id: 5,
        orderId: 12313,
        purchaseDate: '12/12/12',
        noOfProducts: 231,
        totalPrice: 23.32,
      }
    ]
  }
];

export { customerData };
