import { configureStore } from '@reduxjs/toolkit';
import { discoverReducer } from '../components/Screens/Discover/slice';
import { favoriteReducer } from '../components/Screens/Favorite/slice';

export const store = configureStore({
  reducer: {
    discover: discoverReducer,
    favorite: favoriteReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
