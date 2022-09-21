import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import {
  useDiscover,
  useFavorite,
  useWatchLater,
} from '../../../utils/selectors';
import { Spinner } from '../../UI/Spinner';
import { fetchSearchFilms } from './slice';
import { FilmCard } from '../../UI/FilmCard';
import { useIsVisible } from '../../../utils/utils';
import notFound from '../../../assets/img/notFound.png';

const Discover = () => {
  const dispatch = useAppDispatch();

  const { isLoading, films, error, lastSearch } = useDiscover();
  const favorite = useFavorite();
  const watchLater = useWatchLater();

  const endListRef = useRef(null);

  const isListEnded = useIsVisible(endListRef);

  const isEmpty = !isLoading && !error && !films.length;

  useEffect(() => {
    isListEnded && dispatch(fetchSearchFilms(lastSearch));
  }, [isListEnded]);

  return (
    <main className='filmContainer'>
      {films.map(({ id, ...rest }) => (
        <FilmCard
          key={id}
          id={id}
          isInFavorite={Boolean(favorite[id])}
          isInWatchLater={Boolean(watchLater[id])}
          {...rest}
        />
      ))}
      {isLoading && <Spinner />}
      {isEmpty && <img src={notFound} alt='not found' className='notFound' />}
      {error && <div className='error'>{error}</div>}
      <div ref={endListRef}></div>
    </main>
  );
};

export { Discover };
