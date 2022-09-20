import styles from './styles.module.scss';

const SearchPlaceholder: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className={styles.searchPlaceholder}>{children}</div>;

export { SearchPlaceholder };
