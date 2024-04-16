import { User } from 'model/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
export function detectLogin(): any {
  const token = localStorage.getItem('access_token');
  if (token) {
    const decodedToken: any = jwt_decode(token);
    // console.log('Decoded Token', decodedToken);
    const currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken?.exp * 1000 < currentDate.getTime()) {
      // console.log('Token expired.');
      localStorage.clear();
      return false;
    } else {
      // console.log('Valid token');
      return { isLoggedIn: true, user_id: decodedToken?.id };
    }
  }
  return false;
}
const isDetectLogin = detectLogin();
const user = JSON.parse(localStorage.getItem('currentUser') as any) || null;

export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
  error?: any;
}
const initialState: AuthState = {
  isLoggedIn: isDetectLogin?.isLoggedIn,
  logging: false,
  currentUser: user,
};
const authSlices = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
      state.error = undefined;
    },
    loginFailed(state, action: PayloadAction<any>) {
      state.logging = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.logging = false;
      state.currentUser = undefined;
      state.error = undefined;
    },
  },
});
//actions
export const authActions = authSlices.actions;

//selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;
//reducer
const authReducer = authSlices.reducer;
export default authReducer;
