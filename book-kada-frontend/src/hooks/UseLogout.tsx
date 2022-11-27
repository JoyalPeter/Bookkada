import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/User_Context";

export default function useLogout() {
  const navigate = useNavigate();
  const userdetails = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    userdetails?.setToken(null);
  };
  return { logout };
}
