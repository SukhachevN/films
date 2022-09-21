import { useEffect } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Discover } from '../components/Screens/Discover';
import { Favorite } from '../components/Screens/Favorite';
import { WatchLater } from '../components/Screens/WatchLater';
import { Header } from '../components/UI/Header';
import { SearchForm, SearchPlaceholder } from '../components/UI/SearchForm';
import { Spinner } from '../components/UI/Spinner';
import { useApp } from '../utils/selectors';
import { useAppDispatch } from './hooks';
import { startLoadApp } from './slice';

import './styles.scss';

const App = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useApp();

  useEffect(() => {
    dispatch(startLoadApp());
  }, []);

  if (isLoading)
    return (
      <div className='container'>
        <Spinner />
      </div>
    );

  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/discover' replace />} />
        </Routes>
        <Routes>
          <Route
            path='/discover'
            element={
              <>
                <SearchForm />
                <Discover />
              </>
            }
          />
        </Routes>
        <Routes>
          <Route
            path='/favorite'
            element={
              <>
                <SearchPlaceholder>
                  Here you will see films, which you add to favorite
                </SearchPlaceholder>
                <Favorite />
              </>
            }
          />
        </Routes>
        <Routes>
          <Route
            path='/watchLater'
            element={
              <>
                <SearchPlaceholder>
                  Here you will see films, which you add to watch later list
                </SearchPlaceholder>
                <WatchLater />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
