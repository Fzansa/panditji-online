import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import CategoryPage from './pages/categoryPage/CategoryPage';
import PageNot from './pages/notpage/PageNot';
import ServicePage from './pages/servicePage/ServicePage';
import SuccessMessage from './pages/successMessage/SuccessMessage';
import PanditServicePage from './pages/panditServicePage/PanditServicePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='profile/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='category' element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
        <Route path='service' element={<PrivateRoute><ServicePage /></PrivateRoute>} />
        <Route path='success' element={<PrivateRoute><SuccessMessage /></PrivateRoute>} />
        <Route path='pandit-services' element={<PrivateRoute><PanditServicePage /></PrivateRoute>} />
        <Route path='*' element={<PageNot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
