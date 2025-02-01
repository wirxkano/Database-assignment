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
    ProductID: 1,
    Name: 'Macbook',
    ImgUrl: laptop,
    SellingPrice: '100.000',
    DiscountPrice: '50.000',
    Quantity: 10
  },
  {
    ProductID: 2,
    Name: 'Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  },
  {
    ProductID: 3,
    Name: 'TV không biết hiệu gì',
    ImgUrl: smarttv,
    SellingPrice: '2.000',
    DiscountPrice: '1.999',
    Quantity: 10
  },
  {
    ProductID: 4,
    Name: 'Chuột Mickey',
    ImgUrl: mouse,
    SellingPrice: '1.000.000.000',
    DiscountPrice: null,
    Quantity: 10
  },
  {
    ProductID: 5,
    Name: 'Vẫn là Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  },
  {
    ProductID: 6,
    Name: 'Vẫn là Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  }
];

export const productData = [
  {
    ProductID: 1,
    Name: 'Macbook',
    ImgUrl: laptop,
    SellingPrice: '100.000',
    DiscountPrice: '50.000',
    Quantity: 10
  },
  {
    ProductID: 2,
    Name: 'Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  },
  {
    ProductID: 3,
    Name: 'TV không biết hiệu gì',
    ImgUrl: smarttv,
    SellingPrice: '2.000',
    DiscountPrice: '1.999',
    Quantity: 10
  },
  {
    ProductID: 4,
    Name: 'Chuột Mickey',
    ImgUrl: mouse,
    SellingPrice: '1.000.000.000',
    DiscountPrice: 'Null',
    Quantity: 10
  },
  {
    ProductID: 5,
    Name: 'Vẫn là Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  },
  {
    ProductID: 6,
    Name: 'Vẫn là Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  },
  {
    ProductID: 7,
    Name: 'Vẫn là Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
  },
  {
    ProductID: 8,
    Name: 'Vẫn là Iphone',
    ImgUrl: smartphone2,
    SellingPrice: '1.000.000',
    DiscountPrice: '999.999',
    Quantity: 10
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
  },
  {
    OrderID: 8,
    Status: 'PENDING',
    Name: 'Logitech MX Master 3S',
    CategoryName: 'Mouse',
    Quantity: 1,
    PriceAtOrderedTime: '2.500.000',
    TotalPrice: '2.500.000',
    TotalPriceOfOrder: '2.500.000'
  },
  {
    OrderID: 8,
    Status: 'PENDING',
    Name: 'Logitech MX Master 3S',
    CategoryName: 'Mouse',
    Quantity: 1,
    PriceAtOrderedTime: '2.500.000',
    TotalPrice: '2.500.000',
    TotalPriceOfOrder: '2.500.000'
  },
  {
    OrderID: 8,
    Status: 'PENDING',
    Name: 'Logitech MX Master 3S',
    CategoryName: 'Mouse',
    Quantity: 1,
    PriceAtOrderedTime: '2.500.000',
    TotalPrice: '2.500.000',
    TotalPriceOfOrder: '2.500.000'
  }
];

export const productDetailData = {
  ProductID: 1,
  Name: 'Macbook',
  Description: 'Laptop hiệu suất cao dành cho người dùng chuyên nghiệp.',
  ImgUrl: laptop,
  SellingPrice: '100.000',
  DiscountPrice: '50.000',
  Quantity: 10,
  AverageRate: 5.0,
  BrandName: 'Apple',
  Country: 'Mỹ',
  CategoryName: 'Laptop'
};

export const searchHistoryData = [
  "Điện thoại xiaomi",
  "Tai nghe bluetooth",
  "Tai nghe Sony",
  "Máy tính bảng",
  "Chuột không dây",
  "PS5"
];

export const cartItemData = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  }
];

export const couponData = [
  { 
    CouponID: 1,
    Title: "ARYAHEHE",
    Description: "Giảm 30k cho đơn từ 100k",
    DiscountPercent: 5,
    Quantity: 10
  },
  {
    CouponID: 2,
    Title: "FREESHIP",
    Description: "Miễn phí vận chuyển",
    DiscountPercent: 0,
    Quantity: 10
  },
  { CouponID: 3, Title: "SALE50", Description: "Giảm 50k cho đơn từ 500k", DiscountPercent: 2, Quantity: 10 },
  { CouponID: 4, Title: "SUMMER10", Description: "Giảm 10% cho đơn hàng mùa hè", DiscountPercent: 3, Quantity: 10 },
  { CouponID: 5, Title: "WELCOME100", Description: "Giảm 100k cho khách hàng mới", DiscountPercent: 2, Quantity: 10 },
  {
    CouponID: 6,
    Title: "SHOCK: NO DISCOUNT",
    Description: "Mua nhiều, nhưng giảm chẳng bao nhiêu",
    DiscountPercent: 0,
    Quantity: 10
  },
  { CouponID: 7, Title: "FLASHSALE", Description: "Giảm 30% trong 24 giờ tới", DiscountPercent: 3, Quantity: 10 },
  {
    CouponID: 8,
    Title: "YOU KNOW IT",
    Description: "Giảm 30k cho đơn hàng",
    DiscountPercent: 4,
    Quantity: 10
  },
  {
    CouponID: 9,
    Title: "NO SALE NO LIFE",
    Description: "Giảm 2%",
    DiscountPercent: 2,
    Quantity: 10
  }
];

