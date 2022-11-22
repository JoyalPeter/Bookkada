import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "../UI/AppBar/AppBar";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppBar></AppBar>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
