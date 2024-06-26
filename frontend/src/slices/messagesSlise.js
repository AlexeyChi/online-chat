import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';
import routes from '../routes';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.api.messagesPath(), { headers });
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => ({ ...state, error: action.error }))
      .addCase(channelsActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        const newMessages = Object
          .values(state.entities)
          .filter((message) => message.channelId !== id);
        messagesAdapter.setAll(state, newMessages);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
