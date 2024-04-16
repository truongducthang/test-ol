import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ConversationApi from 'api/conversationApi';

export const fetchThePrivateConversationOfAUser = createAsyncThunk(
  'conversations/fetchThePrivateConversationOfAUser',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await ConversationApi.getThePrivateConversationOfAUser(
        payload.userId
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response.data);
    }
  }
);

export interface conversationsState {
  conversations: any;
  loading: boolean;
  error: any;
  filters: any;
}
const initialState: conversationsState = {
  conversations: null,
  loading: false,
  error: undefined,
  filters: {},
};
const conversationsSlices = createSlice({
  name: 'conversations',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchThePrivateConversationOfAUser.fulfilled as any]: (
      state: conversationsState,
      action: PayloadAction
    ) => {
      state.conversations = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    [fetchThePrivateConversationOfAUser.rejected as any]: (
      state: conversationsState,
      action: PayloadAction
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchThePrivateConversationOfAUser.pending as any]: (
      state: conversationsState,
      action: PayloadAction
    ) => {
      state.loading = true;
      state.error = undefined;
    },
  },
});
//actions
export const conversationsActions = conversationsSlices.actions;

//selectors

//reducer
const conversationsReducer = conversationsSlices.reducer;
export default conversationsReducer;
