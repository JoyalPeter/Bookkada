import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AppBar from "../UI/AppBar/AppBar";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
