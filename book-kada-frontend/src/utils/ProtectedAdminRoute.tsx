import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../constants/Enums";
import { UserContext } from "../store/User_Context";

export interface IProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: IProtectedAdminRouteProps) {
  const navigate = useNavigate();
  const userDetails = useContext(UserContext);

  useEffect(() => {
    if (userDetails?.userDetails.role !== Role.ADMIN) navigate("/noaccess");
  });

  return <>{children}</>;
}
