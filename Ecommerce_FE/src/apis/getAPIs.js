import { categoryData, productData, trendingProductData } from '~/data/mockData';

export async function homeLoader() {
  const categories = categoryData;
  const trendingProducts = trendingProductData;
  const products = productData;
  
  return { categories, trendingProducts, products };
}
