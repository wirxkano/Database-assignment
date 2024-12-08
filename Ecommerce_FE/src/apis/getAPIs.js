import { axiosInstance } from './axiosInstance';
import { categoryData, orderData, productData, trendingProductData } from '~/data/mockData';

export async function userLoader() {
  const user = (await axiosInstance.get('/users/info')).data.user;
  
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
