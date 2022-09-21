import { memo } from 'react';
import { BsDisplayFill } from 'react-icons/bs';
import { colors } from '../../../utils/constants';

import styles from './styles.module.scss';

interface IWatchButton {
  isFilmScreen?: boolean;
  videoKey: string;
}

const WatchVideo: React.FC<IWatchButton> = memo(
  ({ videoKey, isFilmScreen = false }) => (
    <button className={styles.actionButton}>
      <a href={`https://www.youtube.com/watch?v=${videoKey}`}>
        <BsDisplayFill
          size={isFilmScreen ? '2.5rem' : '2rem'}
          color={colors.darkGray}
        />
      </a>
    </button>
  )
);

export { WatchVideo };
