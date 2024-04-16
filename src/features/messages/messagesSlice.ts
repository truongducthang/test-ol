import { createSlice } from '@reduxjs/toolkit';

export interface messagesState {
  isOpenDrawer: boolean;

}
const initialState: messagesState = {
  isOpenDrawer: false,

};
const messagesSlices = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    toggleDrawer(state) {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
    onOpenDrawer(state) {
      state.isOpenDrawer = true;
    },
    onCloseDrawer(state) {
      state.isOpenDrawer = false;
    },
  },

});
//actions
export const messagesActions = messagesSlices.actions;

//selectors

//reducer
const messagesReducer = messagesSlices.reducer;
export default messagesReducer;
