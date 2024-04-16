import axiosClient from './axiosClient';

const cityApi = {
  getAll(params?:any) {
    const url = '/users';
    return axiosClient.get(url, params);
  },
};
export default cityApi;
