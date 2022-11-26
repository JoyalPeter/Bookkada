import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import HomePage, { BookDataProps } from "../components/Home/HomeComponent";

import AppBar from "../UI/AppBar/AppBar";

export default function Home() {

  return (
    <>
      <AppBar  />
      <HomePage />
    </>
  );
}
