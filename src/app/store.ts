import createSagaMiddleware from '@redux-saga/core';
import {
  Action,
  combineReducers, configureStore,
  ThunkAction
} from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import conversationsReducer from 'features/messages/conversationSlice';
import messagesReducer from 'features/messages/messagesSlice';
import tradingBotReducer from 'features/tradingBot/tradingBotSlice';
import { history } from 'utils/history';
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  messages: messagesReducer,
  conversations: conversationsReducer,
  tradingBot: tradingBotReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
