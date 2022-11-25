import React, { useEffect } from "react";
import useLogout from "../hooks/UseLogout";

export interface IProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { logout } = useLogout();

  useEffect(() => {
    if (localStorage.getItem("token") === null) logout();
  });

  return <>{children}</>;
}
