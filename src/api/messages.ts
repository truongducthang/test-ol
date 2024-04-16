import axiosClient from './axiosClient';

const MessagesApi = {
  getMessages(conversationId: string, params?: any) {
    const url = `/messages/${conversationId}`;
    return axiosClient.get(url, { params: params });
  },
  postMessage: (message: any) => {
    const url = `/messages`;
    return axiosClient.post(url, message);
  },
};
export default MessagesApi;
