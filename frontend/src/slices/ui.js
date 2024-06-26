import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      isOpened: null,
      type: null,
      selectId: null,
    },
    defaultChannelId: '1',
    activeChannelId: '1',
    uiLenguage: {
      defaultLng: 'ru',
      choosenLng: localStorage.getItem('userLng') || '',
    },
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => ({ ...state, activeChannelId: payload }),
    openModal: (state, { payload }) => {
      const { type, selectId } = payload;
      return {
        ...state,
        modal: {
          isOpened: true,
          type,
          selectId: selectId ?? null,
        },
      };
    },
    closeModal: (state) => ({
      ...state,
      modal: {
        isOpened: false,
        type: null,
        selectId: null,
      },
    }),
    setLenguage: (state, { payload }) => {
      localStorage.setItem('userLng', payload);
      return { ...state, uiLenguage: { choosenLng: payload } };
    },
  },
  extraReducers: (build) => {
    build.addCase(channelsActions.removeChannel, (state) => ({
      ...state, activeChannelId: '1',
    }));
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
