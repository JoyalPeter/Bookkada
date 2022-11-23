import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../components/signin/signinModule";
import Home from "../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
