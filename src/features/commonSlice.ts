import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  loading?: boolean;
  error?: any;
}
const initialState: CommonState = {
  loading: false,
  error: undefined,
};
const commonSlices = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {},
  },
});
//actions
export const commonActions = commonSlices.actions;

//selectors

//reducer
const commonReducer = commonSlices.reducer;
export default commonReducer;
