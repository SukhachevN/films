import { Link } from 'react-router-dom';
import { memo } from 'react';
import { imagePath } from '../../../utils/constants';
import { ShorFilmInfo } from '../../../utils/interfaces';
import imgPlaceholder from '../../../assets/img/imagePlaceholder.jpg';
import { LikeButton, Rating, WatchLaterButton } from '../ActionButtons';

import styles from './styles.module.scss';

interface IFilmCard extends ShorFilmInfo {
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

    const buttonProps = { id, title, posterPath, overview, voteAverage };

    return (
      <div className={styles.film} aria-label={title} role='listitem'>
        <Link to={`/film/${id}`}>
          <img
            src={imgSrc}
            alt={`${title} film poster`}
            className={styles.film__img}
          />
          <h2 className={styles.film__h2}>{title}</h2>
          <p className={styles.film__p}>{overview}</p>
        </Link>
        <div className={styles.film__buttons}>
          <LikeButton isActive={isInFavorite} {...buttonProps} />
          <Rating percentage={voteAverage * 10} />
          <WatchLaterButton isActive={isInWatchLater} {...buttonProps} />
        </div>
      </div>
    );
  }
);

export { FilmCard };
