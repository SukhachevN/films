import { useAppSelector } from '../App/hooks';
import { RootState } from '../App/store';

const discoverSelectorFunc = (state: RootState) => state.discover;
const favoriteSelectorFunc = (state: RootState) => state.favorite;

export const useDiscover = () => useAppSelector(discoverSelectorFunc);
export const useFavorite = () => useAppSelector(favoriteSelectorFunc);
