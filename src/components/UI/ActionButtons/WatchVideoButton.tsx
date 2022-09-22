import { memo } from 'react';
import { BsDisplayFill } from 'react-icons/bs';
import { colors } from '../../../utils/constants';

import styles from './styles.module.scss';

interface IWatchButton {
  videoKey: string;
}

const WatchVideoButton: React.FC<IWatchButton> = memo(({ videoKey }) => (
  <button className={styles.actionButton}>
    <a href={`https://www.youtube.com/watch?v=${videoKey}`}>
      <BsDisplayFill size='2.5rem' color={colors.darkGray} />
    </a>
  </button>
));

export { WatchVideoButton };
