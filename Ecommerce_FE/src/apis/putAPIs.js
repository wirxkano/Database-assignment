import { splitName } from '~/utils/splitName';
import { axiosInstance } from './axiosInstance';

export async function updateInfoAction(data) {
  const { lastName, firstName } = splitName(data.fullName);
  data = {
    ...data,
    lastName,
    firstName
  };

  const response = await axiosInstance.put('/users/update-info', data);

  return response;
}