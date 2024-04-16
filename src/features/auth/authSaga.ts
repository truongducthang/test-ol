import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { push } from 'connected-react-router';
import { HOME_ROUTE } from 'constants/common';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload): Generator {
  try {
    const auth: any = yield call(authApi.login, payload);
    console.log({ auth, payload });
    localStorage.setItem('access_token', auth.token);
    localStorage.setItem('currentUser', JSON.stringify(auth.data.user));

    yield put(authActions.loginSuccess(auth.data.user));
    //redirect to login page
    yield put(push(HOME_ROUTE));
  } catch (error) {
    yield put(authActions.loginFailed(error));
  }
}
function* handleLogout() {
  console.log('handleLogout');
  localStorage.clear();
  yield put(push('/login'));
}
function* watchLoginFlow() {
  while (true) {
    console.log('watch login flow');
    //detect expire , token
    const isToken = Boolean(localStorage.getItem('access_token'));
    console.log({ isToken });
    // end detect expire , token
    if (!isToken) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}
export function* authSaga() {
  yield fork(watchLoginFlow);
}
