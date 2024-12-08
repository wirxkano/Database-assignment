import { redirect } from 'react-router-dom';
import { axiosInstance } from '~/apis/axiosInstance';
import { splitName } from '~/utils/splitName';

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const response = await axiosInstance.post('users/login', data);

  if (response.status === 200) {
    sessionStorage.setItem('isLoggedIn', true);
    return redirect('/');
  }

  return 0;
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const { lastName, firstName } = splitName(formData.get('name'));

  const data = {
    lastName: lastName,
    firstName: firstName,
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  };

  const response = await axiosInstance.post('users/register', data);
  
  if (response.status === 201) {
    sessionStorage.setItem('successMessage', 'Đăng ký tài khoản thành công!');
    return redirect('/login');
  }
}

export async function logoutAction() {
  const response = await axiosInstance.post('/users/logout');

  return response;
}

export async function viewTrendingProducts(data) {
  const response = await axiosInstance.post('/products/trending', data);
  
  return response;
}
