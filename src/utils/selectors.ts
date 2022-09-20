import { useAppSelector } from '../App/hooks';
import { RootState } from '../App/store';

const discoverSelectorFunc = (state: RootState) => state.discover;

export const useDiscover = () => useAppSelector(discoverSelectorFunc);
