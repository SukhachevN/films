import { memo } from 'react';
import { BsFillClockFill } from 'react-icons/bs';
import { colors } from '../../../utils/constants';
import { IActionButton } from '../../../utils/interfaces';

import styles from './styles.module.scss';

const WatchLater: React.FC<IActionButton> = memo(
  ({ isActive, isFilmScreen = false }) => {
    const ariaLabel =
      (isActive ? 'remove from' : 'add to') + ' watch later list';
    const size = isFilmScreen ? '2.5rem' : '2rem';
    const color = isActive ? colors.green : colors.darkGray;

    const onClick = () => console.log('TODO watch later');

    return (
      <button
        className={styles.actionButton}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        <BsFillClockFill size={size} color={color} />
      </button>
    );
  }
);

export { WatchLater };
