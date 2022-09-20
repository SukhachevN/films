import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Discover } from '../components/Screens/Discover';
import { Header } from '../components/UI/Header';
import { SearchForm, SearchPlaceholder } from '../components/UI/SearchForm';

import './styles.scss';

const App = () => {
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
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
