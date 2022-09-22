import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import { initFavorite } from '../components/Screens/Favorite';
import { initWatchLater } from '../components/Screens/WatchLater';
import { favoriteKey, watchLaterKey } from '../utils/constants';

interface IAppState {
  isLoading: boolean;
}

const initialState: IAppState = { isLoading: true };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoadApp: () => {},
    finishLoadApp: (state) => {
      state.isLoading = false;
    },
  },
});

export const { reducer: appReducer } = appSlice;

export const { startLoadApp, finishLoadApp } = appSlice.actions;

export const listenApp = createListenerMiddleware();

listenApp.startListening({
  actionCreator: startLoadApp,
  effect: (_, listenerAPI) => {
    try {
      const unparsedFavorite = localStorage.getItem(favoriteKey) || '{}';
      const unparsedWatchLater = localStorage.getItem(watchLaterKey) || '{}';

      const favorite = JSON.parse(unparsedFavorite);
      const watchLater = JSON.parse(unparsedWatchLater);

      listenerAPI.dispatch(initFavorite(favorite));
      listenerAPI.dispatch(initWatchLater(watchLater));
    } catch (e) {
      localStorage.setItem(favoriteKey, '{}');
      localStorage.setItem(watchLaterKey, '{}');
    }
    listenerAPI.dispatch(finishLoadApp());
  },
});
