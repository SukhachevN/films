import { Link, useMatch } from 'react-router-dom';
import cn from 'classNames';

import styles from './styles.module.scss';

interface INavLink {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<INavLink> = ({ to, children }) => {
  const isMatching = useMatch(to);

  return (
    <Link
      to={to}
      className={cn(styles.navLink, { [styles.navLink_match]: isMatching })}
    >
      {children}
    </Link>
  );
};

export { NavLink };
