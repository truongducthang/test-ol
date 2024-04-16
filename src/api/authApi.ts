import axiosClient from './axiosClient';

const authApi = {
  login(payload?: any) {
    const url = '/users/login';
    return axiosClient.post(url, payload);
  },
};
export default authApi;
