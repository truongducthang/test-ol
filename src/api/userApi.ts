import axiosClient from './axiosClient';

const userApi = {
  getAll(params?: any) {
    const url = '/users';
    return axiosClient.get(url, params);
  },
  getUserById(userId: string, params?: any) {
    const url = `/users/${userId}`;
    return axiosClient.get(url, params);
  },
};
export default userApi;
