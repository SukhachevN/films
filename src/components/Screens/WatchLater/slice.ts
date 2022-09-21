import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../App/store';
import { watchLaterKey } from '../../../utils/constants';
import { StoredFilmsState } from '../../../utils/interfaces';
import { handleStoredFilm, setStoredFilmsState } from '../../../utils/utils';

const initialState: StoredFilmsState = {
  films: {},
};

export const watchLaterSlice = createSlice({
  name: 'watchLater',
  initialState,
  reducers: {
    handleWatchLater: handleStoredFilm,
    initWatchLater: setStoredFilmsState,
  },
});

export const { handleWatchLater, initWatchLater } = watchLaterSlice.actions;

export const { reducer: watchLaterReducer } = watchLaterSlice;

export const listenWatchLater = createListenerMiddleware();

listenWatchLater.startListening({
  actionCreator: handleWatchLater,
  effect: (_, listenerAPI) => {
    const {
      watchLater: { films },
    } = listenerAPI.getState() as RootState;
    const stringifyiedWatchLater = JSON.stringify(films);

    localStorage.setItem(watchLaterKey, stringifyiedWatchLater);
  },
});
