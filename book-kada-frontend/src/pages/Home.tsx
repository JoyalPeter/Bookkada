import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import UserPage from "../components/Home/HomeComponent";
import { BookData } from "../constants/Interfaces";

import AppBar from "../UI/AppBar/AppBar";

export default function Home() {
  const [data, setData] = useState([] as BookData[]);

  return (
    <>
      <AppBar setData={setData} />
      <UserPage />
    </>
  );
}
