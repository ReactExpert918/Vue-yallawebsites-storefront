const productData = [
    {
        id: 1,
        enabled: true,
        visibility: 1,
        layout: 1,
        url: "product-1",
        categories: [1,3,4,5],
        productName: 'product 1',
        productType: 0,
        price: '423.12',
        costPrice: '300.10',
        salePrice: '350.00',
        qty: 13,
        sku: 'SSD-132',
        ean: "SDASDD1231",
        shortDescription: "<div>Short Description Test</div>",
        fullProductDecription: "<div>Long Description Test</div>",
        images:["/path/placeholder.jpg", "/path/placeholder.jpg"],
        productVariations: [
          {
            id: 1,
            variationName: "Color",
            variationValues: ["Red", "Green", "Blue"],
          },
          {
            id: 2,
            variationName: "Size",
            variationValues: ["Small", "Medium", "Large"],
          }
        ],
        productVariationProducts: [
          {
            id: 1,
            variationProductName: "red/small",
            price: '423.12',
            qty: 13,
            sku: 'SSD-132',
            costPrice: '300.10',
            salePrice: '350.00',
            ean: "SDASDD1231",
            customImage:["/path/placeholder.jpg"],
            customAttributes:[
              {
                id: 1,
                attributeId: 0,
                attributeValue: 2,
              },
              {
                id: 2,
                attributeId: 3,
                attributeValue: 2,
              }
            ],
          }
        ],
        attributes:[
          {
            id: 1,
            attributeId: 0,
            attributeValue: 2,
          },
          {
            id: 2,
            attributeId: 3,
            attributeValue: 2,
          }
        ],
        bundleProducts: [
          {
            id: 1,
            productId: 23,
            selected: true,
          },
        ],
        metaTitle: 'Product 1',
        metaKeywords: ["keyword1", "keyword2", "keyword3"],
        metaDescription: 'This is test meta description data',
      },
];

export { productData };
