import { Button, Link } from "@mui/material";
import React from "react";
import UserPage from "../components/Home/HomeComponent";

import AppBar from "../UI/AppBar/AppBar";

export default function Home() {
  return (
    <>
      <AppBar />
      <UserPage />
      <Link href="/signin">{"signin"}</Link>
    </>
  );
}
