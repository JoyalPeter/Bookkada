import React, { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useLogout from "../../hooks/UseLogout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/User_Context";
import { Role } from "../../constants/Enums";

export interface IUseMenuProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  mobileMoreAnchorEl: HTMLElement | null;
  setMobileMoreAnchorEl: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
}

export default function useMenu({ anchorEl, setAnchorEl }: IUseMenuProps) {
  const { logout } = useLogout();
  const isMenuOpen = Boolean(anchorEl);
  const userContext = useContext(UserContext);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {userContext?.userDetails.role === Role.CLIENT && (
        <MenuItem onClick={() => navigate("/orders")}>My Orders</MenuItem>
      )}
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return { menuId, renderMenu };
}
