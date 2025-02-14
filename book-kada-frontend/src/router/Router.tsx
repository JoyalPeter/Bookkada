import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../components/signin/SigninModule";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Signup from "../pages/Signup";
import DetailsPage from "../pages/DetailsPage";
import AdminPage from "../pages/AdminPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import NotFound from "../pages/NotFound";
import OrderPage from "../pages/OrdersPage";
import ProfilePage from "../pages/Profile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/details/:id" element={<DetailsPage />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
