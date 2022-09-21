import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import { favoriteKey } from '../../../utils/constants';
import { StoredFilmsState } from '../../../utils/interfaces';
import { handleStoredFilm, setStoredFilmsState } from '../../../utils/utils';

const initialState: StoredFilmsState = {
  films: {},
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    handleFavorite: handleStoredFilm,
    initFavorite: setStoredFilmsState,
  },
});

export const { handleFavorite, initFavorite } = favoriteSlice.actions;

export const { reducer: favoriteReducer } = favoriteSlice;

export const listenFavorite = createListenerMiddleware();

listenFavorite.startListening({
  actionCreator: handleFavorite,
  effect: (_, listenerAPI) => {
    const {
      favorite: { films },
    } = listenerAPI.getState() as RootState;
    const stringifyiedFavorite = JSON.stringify(films);

    localStorage.setItem(favoriteKey, stringifyiedFavorite);
  },
});
