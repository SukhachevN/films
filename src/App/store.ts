import { configureStore } from '@reduxjs/toolkit';
import { discoverReducer } from '../components/Screens/Discover';
import {
  favoriteReducer,
  listenFavorite,
} from '../components/Screens/Favorite';
import {
  listenWatchLater,
  watchLaterReducer,
} from '../components/Screens/WatchLater';
import { appReducer, listenApp } from './slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    discover: discoverReducer,
    favorite: favoriteReducer,
    watchLater: watchLaterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      listenApp.middleware,
      listenFavorite.middleware,
      listenWatchLater.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
