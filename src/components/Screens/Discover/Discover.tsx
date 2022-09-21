import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../../App/hooks';
import { useDiscover, useFavorite } from '../../../utils/selectors';
import { Spinner } from '../../UI/Spinner';
import { fetchSearchFilms } from './slice';
import { FilmCard } from '../../UI/FilmCard';
import { useIsVisible } from '../../../utils/utils';

const Discover = () => {
  const dispatch = useAppDispatch();

  const { isLoading, films, error, lastSearch } = useDiscover();
  const favorite = useFavorite();

  const isEmpty = !films.length;

  const endListRef = useRef(null);

  const isListEnded = useIsVisible(endListRef);

  useEffect(() => {
    isListEnded && dispatch(fetchSearchFilms(lastSearch));
  }, [isListEnded]);

  return (
    <main className={cn('filmContainer', { ['filmContainer_empty']: isEmpty })}>
      {films.map(({ id, ...rest }) => (
        <FilmCard
          key={id}
          id={id}
          {...rest}
          isInFavorite={Boolean(favorite[id])}
          isInWatchLater={false} // TODO
        />
      ))}
      {isLoading && <Spinner />}
      <div ref={endListRef}></div>
    </main>
  );
};

export { Discover };
