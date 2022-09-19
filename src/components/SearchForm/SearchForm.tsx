import { FaSearch } from 'react-icons/fa';
import { debounce } from '../../utils/utils';

import styles from './styles.module.scss';

const SearchForm = () => {
  const debouncedSearch = debounce(
    (search: string) => console.log(search), // TODO
    300
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSearch(e.target.value);

  return (
    <form className={styles.searchForm}>
      <input
        className={styles.searchForm__input}
        placeholder='Search film...'
        id='search'
        type='search'
        onChange={onChange}
      />
      <label htmlFor='search' className={styles.searchForm__label}>
        <FaSearch aria-label='search' />
      </label>
    </form>
  );
};

export { SearchForm };
