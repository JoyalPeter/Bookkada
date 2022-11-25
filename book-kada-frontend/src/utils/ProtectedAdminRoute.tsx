import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../constants/Enums";
import useLogout from "../hooks/UseLogout";
import { UserContext } from "../store/User_Context";

export interface IProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: IProtectedAdminRouteProps) {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const userDetails = useContext(UserContext);
  if (userDetails?.userDetails.role !== Role.ADMIN) navigate("/noaccess");

  return <>{children}</>;
}
