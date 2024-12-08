import laptop from '~/assets/macbook-cat.png';
import smartphone from '~/assets/smartphone-cat2.png';
import smartphone2 from '~/assets/smartphone-cat.png';
import smarttv from '~/assets/smartTV-cat.png';
import mouse from '~/assets/mouse-cat.png';

export const userData = {
  fullName: 'John Doe',
  gender: 'M',
  dob: '2000-01-01',
  phone: '123-45-678',
  email: 'john.doe@company.com',
  addresses: [
    {
      id: 1,
      label: 'Home',
      street: '123 Main St',
      commune: '14',
      district: 'D1',
      city: 'HCM',
    },
    {
      id: 2,
      label: 'Work',
      street: '456 Office Blvd',
      commune: '10',
      district: 'D3',
      city: 'HCM',
    },
  ],
};

export const categoryData = [
  {
    id: 1,
    name: 'Laptop',
    quantity: 12,
    img: laptop
  },
  {
    id: 2,
    name: 'Điện thoại',
    quantity: 30,
    img: smartphone
  },
  {
    id: 3,
    name: 'TV thông minh',
    quantity: 5,
    img: smarttv
  },
  {
    id: 4,
    name: 'Chuột',
    quantity: 22,
    img: mouse
  }
];

export const trendingProductData = [
  {
    id: 1,
    name: 'Macbook',
    img: laptop,
    selling_price: '100.000',
    discount_price: '50.000'
  },
  {
    id: 2,
    name: 'Iphone',
    img: smartphone2,
    selling_price: '1.000.000',
    discount_price: '999.999'
  },
  {
    id: 3,
    name: 'TV không biết hiệu gì',
    img: smarttv,
    selling_price: '2.000',
    discount_price: '1.999'
  },
  {
    id: 4,
    name: 'Chuột Mickey',
    img: mouse,
    selling_price: '1.000.000.000',
    discount_price: 'Null'
  },
  {
    id: 5,
    name: 'Chuột Mickey',
    img: mouse,
    selling_price: '1.000.000.000',
    discount_price: 'Null'
  }
];

export const productData = [
  {
    id: 1,
    name: 'Macbook',
    img: laptop,
    selling_price: '100.000',
    discount_price: '50.000'
  },
  {
    id: 2,
    name: 'Iphone',
    img: smartphone2,
    selling_price: '1.000.000',
    discount_price: '999.999'
  },
  {
    id: 3,
    name: 'TV không biết hiệu gì',
    img: smarttv,
    selling_price: '2.000',
    discount_price: '1.999'
  },
  {
    id: 4,
    name: 'Chuột Mickey',
    img: mouse,
    selling_price: '1.000.000.000',
    discount_price: 'Null'
  },
  {
    id: 5,
    name: 'Vẫn là Iphone',
    img: smartphone2,
    selling_price: '1.000.000',
    discount_price: '999.999'
  },
  {
    id: 6,
    name: 'Vẫn là Iphone',
    img: smartphone2,
    selling_price: '1.000.000',
    discount_price: '999.999'
  },
  {
    id: 7,
    name: 'Vẫn là Iphone',
    img: smartphone2,
    selling_price: '1.000.000',
    discount_price: '999.999'
  },
  {
    id: 8,
    name: 'Vẫn là Iphone',
    img: smartphone2,
    selling_price: '1.000.000',
    discount_price: '999.999'
  }
];

export const orderData = [
  {
    OrderID: 1,
    Status: 'COMPLETED',
    Name: 'Macbook Pro 14-inch',
    CategoryName: 'Laptop',
    Quantity: 1,
    PriceAtOrderedTime: '40.000.000',
    TotalPrice: '40.000.000',
    TotalPriceOfOrder: '40.000.000'
  },
  {
    OrderID: 2,
    Status: 'PENDING',
    Name: 'iPhone 14 Pro Max',
    CategoryName: 'Smartphone',
    Quantity: 1,
    PriceAtOrderedTime: '35.000.000',
    TotalPrice: '35.000.000',
    TotalPriceOfOrder: '35.000.000'
  },
  {
    OrderID: 3,
    Status: 'CANCELLED',
    Name: 'Samsung Galaxy Tab S8',
    CategoryName: 'Tablet',
    Quantity: 1,
    PriceAtOrderedTime: '20.000.000',
    TotalPrice: '20.000.000',
    TotalPriceOfOrder: '20.000.000'
  },
  {
    OrderID: 4,
    Status: 'PROCESSING',
    Name: 'Sony WH-1000XM5',
    CategoryName: 'Headphones',
    Quantity: 2,
    PriceAtOrderedTime: '8.000.000',
    TotalPrice: '16.000.000',
    TotalPriceOfOrder: '16.000.000'
  },
  {
    OrderID: 5,
    Status: 'DELIVERED',
    Name: 'Dell XPS 13',
    CategoryName: 'Laptop',
    Quantity: 1,
    PriceAtOrderedTime: '45.000.000',
    TotalPrice: '45.000.000',
    TotalPriceOfOrder: '45.000.000'
  },
  {
    OrderID: 6,
    Status: 'COMPLETED',
    Name: 'Apple Watch Series 8',
    CategoryName: 'Smartwatch',
    Quantity: 1,
    PriceAtOrderedTime: '12.000.000',
    TotalPrice: '12.000.000',
    TotalPriceOfOrder: '12.000.000'
  },
  {
    OrderID: 7,
    Status: 'PENDING',
    Name: 'Logitech MX Master 3S',
    CategoryName: 'Mouse',
    Quantity: 1,
    PriceAtOrderedTime: '2.500.000',
    TotalPrice: '2.500.000',
    TotalPriceOfOrder: '2.500.000'
  }
];

