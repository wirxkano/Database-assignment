import { axiosInstance } from './axiosInstance';
import { categoryData } from '~/data/mockData';

export async function userLoader() {
  const response = await axiosInstance.get("/users/info");
  const user = response.data.user;

  return { user, response };
}

export async function getSearchProductHistory() {
  const response = await axiosInstance.get(`users/search-history`);

  return response;
}

export async function homeLoader() {
  const categories = categoryData;
  const products = (await axiosInstance.get('/products/all')).data;

  return { categories, products };
}

export async function productDetailsLoader(id) {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
}

export async function orderLoader() {
  const orders = (await axiosInstance.get("/orders/history?status=All")).data.orders;

  return { orders };
}

export async function getOrdersByStatus(status) {
  const response = await axiosInstance.get(`/orders/history?status=${status}`);

  return response;
}

export async function getOrdersById(id) {
  const response = await axiosInstance.get(`orders/search?q=${id}`);

  return response;
}

export async function getProductsByKeyword(keyword) {
  const response = await axiosInstance.get(`products/search?q=${keyword}`);

  return response;
}

export async function getCartItems() {
  const cartItems = await axiosInstance.get('carts');
  
  return cartItems;
}

export async function getCoupons() {
  const coupons = await axiosInstance.get('coupons');
  
  return coupons;
}
