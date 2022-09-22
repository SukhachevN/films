import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../App/hooks';
import { useFavorite, useFilm, useWatchLater } from '../../../utils/selectors';
import { Spinner } from '../../UI/Spinner';
import { fetchFilm, fetchFilmVideos } from './slice';
import { IFilm } from '../../../utils/interfaces';
import notFound from '../../../assets/img/notFound.png';
import imgPlaceholder from '../../../assets/img/imagePlaceholder.jpg';
import { imagePathLarge } from '../../../utils/constants';
import {
  LikeButton,
  Rating,
  WatchLaterButton,
  WatchVideoButton,
} from '../../UI/ActionButtons';

import styles from './styles.module.scss';

const Film = () => {
  const { filmId } = useParams();

  const dispatch = useAppDispatch();

  const { film, isLoading, error, videoKey } = useFilm();
  const favorite = useFavorite();
  const watchLater = useWatchLater();

  useEffect(() => {
    if (filmId) {
      dispatch(fetchFilm(filmId));
      dispatch(fetchFilmVideos(filmId));
    }
  }, [filmId]);

  if (isLoading || (!error && !film)) return <Spinner />;

  if (error)
    return (
      <main className={styles.notFoundBlock}>
        <p className='error'>{error}</p>
        <img src={notFound} alt='not found' className='notFound' />
      </main>
    );

  const {
    id,
    title,
    posterPath,
    overview,
    voteAverage,
    releaseDate,
    budget,
    homepage,
  } = film as IFilm;

  const imagePath = posterPath ? imagePathLarge + posterPath : imgPlaceholder;

  const buttonProps = {
    id,
    title,
    posterPath,
    overview,
    voteAverage,
    isFilmScreen: true,
  };

  return (
    <main className={styles.film}>
      <h1 className={styles.film__h1}>{title}</h1>
      <div className={styles.film__content}>
        <img
          src={imagePath}
          alt={`${title} poster`}
          className={styles.film__img}
        />
        <ul className={styles.film__propertyList}>
          <li>Release date: {releaseDate || 'unknown'}</li>
          <li>Budget: {budget ? `${budget}$` : 'unknown'}</li>
          <li>
            Site:{' '}
            {homepage ? (
              <a className={styles.film__siteLink} href={homepage}>
                {homepage}
              </a>
            ) : (
              'No site'
            )}
          </li>
          <li>Description: {overview}</li>
          <li className={styles.film__buttons}>
            <LikeButton isActive={Boolean(favorite[id])} {...buttonProps} />
            <WatchLaterButton
              isActive={Boolean(watchLater[id])}
              {...buttonProps}
            />
            {videoKey && <WatchVideoButton videoKey={videoKey} />}
          </li>
          <li>
            <Rating percentage={Math.round(voteAverage * 10)} isFilmScreen />
          </li>
        </ul>
      </div>
    </main>
  );
};

export { Film };
