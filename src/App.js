import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import CategoryPage from './pages/categoryPage/CategoryPage';
import PageNot from './pages/notpage/PageNot';
import ServicePage from './pages/servicePage/ServicePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='profile/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='category' element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
        <Route path='service' element={<PrivateRoute><ServicePage /></PrivateRoute>} />
        <Route path='*' element={<PageNot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
