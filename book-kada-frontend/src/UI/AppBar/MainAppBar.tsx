import {
  LightMode,
  DarkMode,
  ShoppingCartSharp,
  LibraryAdd,
  Login,
  AccountCircle,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Themes, Role } from "../../constants/Enums";
import useLogout from "../../hooks/UseLogout";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import { ThemeContext } from "../../store/Theme_Context";
import { UserContext } from "../../store/User_Context";

export interface IMobileAppBarProps {
  mobileMenuId: string;
  handleModeChange: () => void;
  menuId: string;
  setAddFlag: React.Dispatch<React.SetStateAction<boolean>>;
  handleProfileMenuOpen: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export default function MainAppBar({
  menuId,
  mobileMenuId,
  handleModeChange,
  setAddFlag,
  handleProfileMenuOpen,
}: IMobileAppBarProps) {
  const themeMode = useContext(ThemeContext);
  const userDetails = useContext(UserContext);
  const shoppingcartData = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const { logout } = useLogout();
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton
        size="large"
        aria-label="mode"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleModeChange}
        color="inherit"
      >
        {themeMode?.themeMode === Themes.DARK ? <LightMode /> : <DarkMode />}
      </IconButton>
      {userDetails?.userDetails.role !== Role.ADMIN ? (
        <IconButton
          size="large"
          aria-label="cart of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={() => navigate("/cart")}
          color="inherit"
        >
          <ShoppingCartSharp />
          {(shoppingcartData?.itemCount === 0 || shoppingcartData !== null) && (
            <Typography>{shoppingcartData?.itemCount}</Typography>
          )}
        </IconButton>
      ) : (
        <IconButton
          size="large"
          aria-label="cart of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={() => setAddFlag(true)}
          color="inherit"
        >
          <LibraryAdd />
        </IconButton>
      )}

      {userDetails?.userDetails.userId === -1 ? (
        <IconButton
          size="large"
          aria-label="logout"
          aria-haspopup="true"
          onClick={logout}
          color="inherit"
        >
          <Login /> <Typography>Login</Typography>
        </IconButton>
      ) : (
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      )}
    </Box>
  );
}
