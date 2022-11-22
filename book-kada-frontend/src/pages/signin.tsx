import React from "react";
import SigninModule from "../components/signin/signinModule";
import { Toast } from "../constants/enums";
import showToast from "../utils/Toastify";

export default function Signin() {
  showToast(Toast.SUCCESS, "vhhh");
  return <SigninModule />;
}
