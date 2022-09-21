import { Link } from 'react-router-dom';
import { memo } from 'react';
import { imagePath } from '../../../utils/constants';
import { IFilm } from '../../../utils/interfaces';
import imgPlaceholder from '../../../assets/img/imagePlaceholder.jpg';
import { Like, Rating, WatchLater } from '../ActionButtons';

import styles from './styles.module.scss';

interface IFilmCard extends IFilm {
  isInFavorite: boolean;
  isInWatchLater: boolean;
}

const FilmCard: React.FC<IFilmCard> = memo(
  ({
    id,
    title,
    posterPath,
    overview,
    voteAverage,
    isInFavorite,
    isInWatchLater,
  }) => {
    const imgSrc = posterPath ? `${imagePath}${posterPath}` : imgPlaceholder;

    const buttonProps = { id, title, posterPath, overview };

    return (
      <div className={styles.film} aria-label={title} role='listitem'>
        <Link to={`films/${id}`}>
          <img
            src={imgSrc}
            alt={`${title} film poster`}
            className={styles.film__img}
          />
          <h2 className={styles.film__h2}>{title}</h2>
          <p className={styles.film__p}>{overview}</p>
        </Link>
        <div className={styles.film__buttons}>
          <Like isActive={isInFavorite} {...buttonProps} />
          <Rating percentage={voteAverage * 10} />
          <WatchLater isActive={isInWatchLater} {...buttonProps} />
        </div>
      </div>
    );
  }
);

export { FilmCard };
