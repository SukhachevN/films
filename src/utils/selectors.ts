import { useAppSelector } from '../App/hooks';
import { RootState } from '../App/store';

const discoverSelectorFunc = (state: RootState) => state.discover;
const favoriteSelectorFunc = (state: RootState) => state.favorite.films;
const watchLaterSelectorFunc = (state: RootState) => state.watchLater.films;
const appSelectorFunc = (state: RootState) => state.app;

export const useDiscover = () => useAppSelector(discoverSelectorFunc);
export const useFavorite = () => useAppSelector(favoriteSelectorFunc);
export const useWatchLater = () => useAppSelector(watchLaterSelectorFunc);
export const useApp = () => useAppSelector(appSelectorFunc);
