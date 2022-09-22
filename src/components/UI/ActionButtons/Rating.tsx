import { CircularProgressbar } from 'react-circular-progressbar';
import cn from 'classnames';
import { memo } from 'react';

import 'react-circular-progressbar/dist/styles.css';
import styles from './styles.module.scss';

interface IRating {
  percentage: number;
  isFilmScreen?: boolean;
}

const Rating: React.FC<IRating> = memo(
  ({ percentage, isFilmScreen = false }) => (
    <div
      className={cn(styles.progressBar, {
        [styles.progressBar_onFilmScreen]: isFilmScreen,
      })}
    >
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  )
);

export { Rating };
