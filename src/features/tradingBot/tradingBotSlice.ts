import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import binanceApi from "api/binance";
import { ActionTradingAuto } from "model/tradingBot";
const keysPrivate: any =
  JSON.parse(localStorage.getItem("keysPrivate") as any) || null;

//createTradingBot
export const createTradingBot = createAsyncThunk(
  "trading-bot/createTradingBot",
  async (payload: ActionTradingAuto, { rejectWithValue }) => {
    try {
      const response = await binanceApi.createTradingBot(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//stopTradingBot
export const stopTradingBot = createAsyncThunk(
  "trading-bot/stopTradingBot",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await binanceApi.stopTradingBot(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//continueTradingBot
export const continueTradingBot = createAsyncThunk(
  "trading-bot/continueTradingBot",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await binanceApi.continueTradingBot(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

//postActionTradingAuto
export const postActionTradingAuto = createAsyncThunk(
  "trading-bot/postActionTradingAuto",
  async (payload: ActionTradingAuto, { rejectWithValue }) => {
    try {
      const response = await binanceApi.postActionTradingAuto(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

// get all action trading auto
export const getAllActionTradingAuto = createAsyncThunk(
  "trading-bot/getAllActionTradingAuto",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await binanceApi.getAllActionTradingAuto(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

// deleteActionTradingAuto
export const deleteActionTradingAuto = createAsyncThunk(
  "trading-bot/deleteActionTradingAuto",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await binanceApi.deleteActionTradingAuto(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);
// get action trading auto
export interface TradingBotState {
  actionTradingAuto?: any;
  keysPrivate?: any;
  loading?: boolean;
  error?: any;
  changeTradingAuto?: boolean;
}
const initialState: TradingBotState = {
  actionTradingAuto: undefined,
  keysPrivate,
  loading: false,
  error: undefined,
  changeTradingAuto: false,
};
const tradingBotSlices = createSlice({
  name: "trading-bot",
  initialState: initialState,
  reducers: {
    changeKeysPrivate(state: any, action: PayloadAction<any>) {
      state.keysPrivate = action.payload;
    },
    changeTradingAuto(state: any, action: PayloadAction<any>) {
      state.changeTradingAuto = action.payload;
    },
  },
  extraReducers: {
    // createTradingBot
    [createTradingBot.fulfilled as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = true;
      state.error = undefined;
      state.loading = false;
    },
    [createTradingBot.rejected as any]: (state: any, action: PayloadAction) => {
      state.changeTradingAuto = false;
      state.loading = false;
      state.error = action.payload;
    },
    [createTradingBot.pending as any]: (state: any, action: PayloadAction) => {
      state.changeTradingAuto = false;
      state.loading = true;
      state.error = undefined;
    },
    // stopTradingBot
    [stopTradingBot.fulfilled as any]: (state: any, action: PayloadAction) => {
      state.changeTradingAuto = true;
      state.error = undefined;
      state.loading = false;
    },
    [stopTradingBot.rejected as any]: (state: any, action: PayloadAction) => {
      state.changeTradingAuto = false;
      state.loading = false;
      state.error = action.payload;
    },
    [stopTradingBot.pending as any]: (state: any, action: PayloadAction) => {
      state.changeTradingAuto = false;
      state.loading = true;
      state.error = undefined;
    },
    // continueTradingBot
    [continueTradingBot.fulfilled as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = true;
      state.error = undefined;
      state.loading = false;
    },
    [continueTradingBot.rejected as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = false;
      state.loading = false;
      state.error = action.payload;
    },
    [continueTradingBot.pending as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = false;
      state.loading = true;
      state.error = undefined;
    },
    // postActionTradingAuto
    [postActionTradingAuto.fulfilled as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = true;
      state.error = undefined;
      state.loading = false;
    },
    [postActionTradingAuto.rejected as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = false;
      state.loading = false;
      state.error = action.payload;
    },
    [postActionTradingAuto.pending as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = false;
      state.loading = true;
      state.error = undefined;
    },
    // getAllActionTradingAuto
    [getAllActionTradingAuto.fulfilled as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.actionTradingAuto = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    [getAllActionTradingAuto.rejected as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.actionTradingAuto = undefined;
      state.loading = false;
      state.error = action.payload;
    },
    [getAllActionTradingAuto.pending as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.actionTradingAuto = undefined;
      state.loading = true;
      state.error = undefined;
    },
    //delete action trading auto
    [deleteActionTradingAuto.fulfilled as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = true;
      state.error = undefined;
      state.loading = false;
    },
    [deleteActionTradingAuto.rejected as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = false;
      state.loading = false;
      state.error = action.payload;
    },
    [deleteActionTradingAuto.pending as any]: (
      state: any,
      action: PayloadAction
    ) => {
      state.changeTradingAuto = false;
      state.loading = true;
      state.error = undefined;
    },
  },
});
//actions
export const tradingBotActions = tradingBotSlices.actions;

//selectors
export const selectKeysPrivate = (state: any) => state.tradingBot.keysPrivate;
//reducer
const tradingBotReducer = tradingBotSlices.reducer;
export default tradingBotReducer;
