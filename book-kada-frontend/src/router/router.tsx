import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../components/signin/SigninModule';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Signup from '../pages/Signup';
import DetailsPage from '../pages/DetailsPage';
import AdminPage from '../pages/AdminPage';
import AdminBooks from '../pages/AdminBooks';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adminBooks" element={<AdminBooks />} />
      </Routes>
    </BrowserRouter>
  );
}
