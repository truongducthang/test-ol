export type ActionTradingAuto = {
  api_key?: string;
  secret_key?: string;
  tradingBotId?: string | null | undefined | '';
  status: string;
  cryptocurrencies?: string;
  trade_size?: number;
  percent?: number;
  start_price?: number;
  end_price?: number;
};
