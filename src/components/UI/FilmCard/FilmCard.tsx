import { Link } from 'react-router-dom';
import { imagePath } from '../../../utils/constants';
import { IFilm } from '../../../utils/interfaces';
import imgPlaceholder from '../../../assets/img/imagePlaceholder.jpg';

import styles from './styles.module.scss';

const FilmCard: React.FC<IFilm> = ({ id, title, posterPath, overview }) => {
  const imgSrc = posterPath ? `${imagePath}${posterPath}` : imgPlaceholder;

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
    </div>
  );
};

export { FilmCard };
