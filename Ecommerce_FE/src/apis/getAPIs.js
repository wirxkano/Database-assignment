import { categoryData, orderData, productData, trendingProductData, userData } from '~/data/mockData';

export async function userLoader() {
  const user = userData;

  return { user };
}

export async function homeLoader() {
  const categories = categoryData;
  const trendingProducts = trendingProductData;
  const products = productData;
  
  return { categories, trendingProducts, products };
}

export async function orderLoader() {
  const orders = orderData;

  return { orders };
}
