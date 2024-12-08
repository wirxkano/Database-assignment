import { axiosInstance } from './axiosInstance';

export async function deleteAccount() {
  const response = await axiosInstance.delete('/users/delete');
  
  return response;
}