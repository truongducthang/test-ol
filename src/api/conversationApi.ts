import axiosClient from './axiosClient';

const ConversationApi = {
  getThePrivateConversationOfAUser(userId: string, params?: any) {
    const url = `/conversations/${userId}`;
    return axiosClient.get(url, { params: params });
  },
};
export default ConversationApi;
