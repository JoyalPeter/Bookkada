import {
  ShoppingCartSharp,
  LibraryAdd,
  LightMode,
  DarkMode,
  MoreVert,
  Login,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Role, Themes } from "../../constants/Enums";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import { UserContext } from "../../store/User_Context";
import { ThemeContext } from "../../store/Theme_Context";

export interface IMobileAppBarProps {
  mobileMenuId: string;
  handleModeChange: () => void;
  menuId: string;
  setAddFlag: React.Dispatch<React.SetStateAction<boolean>>;
  handleProfileMenuOpen: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export default function MobileAppBar({
  menuId,
  setAddFlag,
  mobileMenuId,
  handleModeChange,
  handleProfileMenuOpen,
}: IMobileAppBarProps) {
  const themeMode = useContext(ThemeContext);
  const userDetails = useContext(UserContext);
  const shoppingcartData = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
          {shoppingcartData?.itemCount !== 0 && (
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
      {userDetails?.userDetails.userId !== -1 ? (
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
      ) : (
        <IconButton
          size="large"
          aria-label="logout"
          aria-haspopup="true"
          onClick={() => navigate("/signin")}
          color="inherit"
        >
          <Login /> <Typography>Login</Typography>
        </IconButton>
      )}
    </Box>
  );
}
