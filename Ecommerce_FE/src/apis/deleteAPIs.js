import { axiosInstance } from './axiosInstance';

export async function deleteAccount() {
  const response = await axiosInstance.delete('/users/delete');
  
  return response;
}

export async function deleteProductInCart(productId){
  try {
    const response = await axiosInstance.delete(`carts/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product from cart:', error);
    throw error;
  }
}
