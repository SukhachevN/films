import { FaSearch } from 'react-icons/fa';
import { useAppDispatch } from '../../../App/hooks';
import { debounce } from '../../../utils/utils';
import { fetchSearchFilms } from '../../Screens/Discover/slice';

import styles from './styles.module.scss';

const SearchForm = () => {
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce(
    (search: string) => dispatch(fetchSearchFilms(encodeURIComponent(search))),
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
