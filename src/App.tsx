import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';

import './styles.scss';

const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Navigate to='/discover' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
