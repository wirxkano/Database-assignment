import { axiosInstance } from "./axiosInstance";
import {
  categoryData,
  productData,
  trendingProductData,
} from "~/data/mockData";

export async function userLoader() {
  const user = (await axiosInstance.get("/users/info")).data.user;

  return { user };
}

export async function homeLoader() {
  const categories = categoryData;
  const trendingProducts = trendingProductData;
  const products = productData;

  return { categories, trendingProducts, products };
}

export async function productDetailsLoader(id) {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
}

export async function orderLoader() {
  const orders = (await axiosInstance.get("/orders/history?status=All")).data
    .orders;

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
