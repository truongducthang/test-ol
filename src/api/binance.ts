import { ActionTradingAuto } from 'model/tradingBot';
import axiosClient from './axiosClient';

const binanceApi = {
  postActionTradingAuto(payload?: ActionTradingAuto) {
    const url = '/trading-bot';
    return axiosClient.post(url, payload);
  },
  getAllActionTradingAuto(params?: any) {
    const url = `/trading-bot/me`;
    return axiosClient.get(url, { params: params });
  },
  deleteActionTradingAuto(id: string) {
    const url = `/trading-bot/${id}`;
    return axiosClient.delete(url);
  },
  createTradingBot(payload?: ActionTradingAuto) {
    const url = '/trading-bot/start-bot';
    return axiosClient.post(url, payload);
  },
  stopTradingBot(id: string) {
    const url = `/trading-bot/stop-bot/${id}`;
    return axiosClient.patch(url);
  },
  continueTradingBot(id: string) {
    const url = `/trading-bot/continue-bot/${id}`;
    return axiosClient.patch(url);
  },
};
export default binanceApi;
