import { useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { fetchSearchFilms } from './slice';

const Discover = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSearchFilms());
  }, []);

  return <main className='filmContainer'>Discover</main>;
};

export { Discover };
