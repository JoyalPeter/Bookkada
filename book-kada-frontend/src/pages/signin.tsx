import React from 'react';
import SigninModule from '../components/signin/SigninModule';
import { Toast } from '../constants/Enums';
import showToast from '../utils/Toastify';

export default function Signin() {
  showToast(Toast.SUCCESS, 'vhhh');
  return <SigninModule />;
}
