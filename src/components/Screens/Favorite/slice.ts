import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IShorFilmInfo } from '../../../utils/interfaces';

const initialState: Record<number, IShorFilmInfo> = {};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    handleFavorite: (state, action: PayloadAction<IShorFilmInfo>) => {
      const { id, ...rest } = action.payload;
      if (state[id]) {
        delete state[id];
      } else {
        state[id] = { id, ...rest };
      }
    },
  },
});

export const { handleFavorite } = favoriteSlice.actions;

export const { reducer: favoriteReducer } = favoriteSlice;
