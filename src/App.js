import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='profile/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
