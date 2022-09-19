import { NavLink } from './NavLink';

import styles from './styles.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.header__links}>
      <NavLink to='/discover'>Discover</NavLink>
      <NavLink to='/favorite'>Favorite</NavLink>
      <NavLink to='/watchLater'>Watch later</NavLink>
    </nav>
  </header>
);

export { Header };
