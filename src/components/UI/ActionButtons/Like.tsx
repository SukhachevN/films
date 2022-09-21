import { memo } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { useAppDispatch } from '../../../App/hooks';
import { colors } from '../../../utils/constants';
import { IActionButton } from '../../../utils/interfaces';
import { handleFavorite } from '../../Screens/Favorite';

import styles from './styles.module.scss';

const Like: React.FC<IActionButton> = memo(
  ({ isActive, isFilmScreen = false, ...film }) => {
    const dispatch = useAppDispatch();

    const ariaLabel = (isActive ? 'remove from' : 'add to') + ' favorite list';
    const size = isFilmScreen ? '2.5rem' : '2rem';
    const color = isActive ? colors.red : colors.darkGray;

    const onClick = () => dispatch(handleFavorite(film));

    return (
      <button
        className={styles.actionButton}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        <BsFillHeartFill size={size} color={color} />
      </button>
    );
  }
);

export { Like };
