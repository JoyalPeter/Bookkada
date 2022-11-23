import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../components/signin/signinModule";
import Home from "../pages/Home";
import Cart from "../pages/Cart"
import DetailsPage from "../pages/DetailsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <>
              <SignIn />
            </>
          }
        ></Route>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/details" element={<DetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
