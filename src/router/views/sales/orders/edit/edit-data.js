const paymentData = [
  {
    id: 1,
    paymentMethod: 'Credit / Debit',

  },
  {
    id: 2,
    paymentMethod: 'Stripe',

  }
];
const shippingData = [
  {
    id: 1,
    shippingMethod: 'UPS',
    shippingCost: 5.00,
  },
  {
    id: 2,
    shippingMethod: 'Fedex',
    shippingCost: 7.00,
  }
];
const viewData = [
  {
      id: 1,
      orderStatus: 'Processing',
      orderNumber: '231234',
      orderDate: '02/13/20',
      customerName: 'Michael Figg',
      customerEmail: 'michael@nvera.com',
      invoiceNumber: '2FDAS31J',
      invoiceDate: '02/10/20',
      creditMemoNumber: '412312',
      creditMemoDate: '12/10/20',
      shipmentNumber: '92318031',
      shipmentDate: '12/10/20',
      billingAddressCustomerName: 'John Doe',
      billingAddressStreetAddress: '14 street address 1',
      billingAddressCity: 'London',
      billingAddressPostCodeZip: 'W1J7BU',
      billingAddressCountry: 'England',
      billingAddressTelephoneNumber: '02138318922',
      shippingAddressCustomerName: 'John Doe',
      shippingAddressStreetAddress: '14 street address 1',
      shippingAddressCity: 'London',
      shippingAddressPostCodeZip: 'W1J7BU',
      shippingAddressCountry: 'England',
      shippingAddressTelephoneNumber: '02138318922',
      paymentMethod: 'Credit / Debit',
      paymentCurrency: 'GBP',
      orderCurrencySymbol: '£',
      paymentAmount: '120.31',
      shippingMethod: 'UPS',
      shippingCost: '5.00',
      subtotal: '100.31',
      total: '123.31',
      orderedItems: [
        {
          id: 1,
          thumbnail: '/custom.jpg',
          productName: 'Product 1',
          productSKU: 'ASDAIU3',
          unitPrice: '12.31',
          qty: '23',
          totalPrice: '23.32',
        },
        {
          id: 2,
          thumbnail: '/custom.jpg',
          productName: 'Product 2',
          productSKU: 'ASDAIU3',
          unitPrice: '12.31',
          qty: '23',
          totalPrice: '23.32',
        },
        {
          id: 3,
          thumbnail: '/custom.jpg',
          productName: 'Product 3',
          productSKU: 'ASDAIU3',
          unitPrice: '12.31',
          qty: '23',
          totalPrice: '23.32',
        },
        {
          id: 4,
          thumbnail: '/custom.jpg',
          productName: 'Product 4',
          productSKU: 'ASDAIU3',
          unitPrice: '12.31',
          qty: '23',
          totalPrice: '23.32',
        },
        {
          id: 5,
          thumbnail: '/custom.jpg',
          productName: 'Product 5',
          productSKU: 'ASDAIU3',
          unitPrice: '12.31',
          qty: '23',
          totalPrice: '23.32',
        }
      ] 
    }
];


export {paymentData, shippingData, viewData };
