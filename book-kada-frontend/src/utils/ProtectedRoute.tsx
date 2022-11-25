import React from "react";
import useLogout from "../hooks/UseLogout";

export interface IProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { logout } = useLogout();
  if (localStorage.getItem("userId") === null) logout();

  return <>{children}</>;
}
