import { useFavorite, useWatchLater } from '../../../utils/selectors';
import { FilmCard } from '../../UI/FilmCard';

const WatchLater = () => {
  const watchLater = useWatchLater();
  const favorite = useFavorite();

  const films = Object.values(watchLater);

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
    </main>
  );
};

export { WatchLater };
