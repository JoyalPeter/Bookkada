import {
  DarkMode,
  LibraryAdd,
  LightMode,
  ShoppingCartSharp,
  Login,
  Logout,
} from "@mui/icons-material";
import { Labels } from "../../constants/Labels";
import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchBar from "./Search";
import useMenu from "./Menu";
import useMobileMenu from "./MobileMenu";
import { ThemeContext } from "../../store/Theme_Context";
import { Role, Themes } from "../../constants/Enums";
import { UserContext } from "../../store/User_Context";
import useLogout from "../../hooks/UseLogout";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const { logout } = useLogout();
  const userDetails = useContext(UserContext);
  const themeMode = useContext(ThemeContext);
  const shoppingcartData = useContext(ShoppingCartContext);
  const { menuId, renderMenu } = useMenu({
    anchorEl,
    setAnchorEl,
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  });

  const {
    mobileMenuId,
    handleProfileMenuOpen,
    handleMobileMenuOpen,
    renderMobileMenu,
  } = useMobileMenu({
    anchorEl,
    setAnchorEl,
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  });

  const handleModeChange = () => {
    if (themeMode?.themeMode === Themes.DARK)
      themeMode?.setThemeMode(Themes.LIGHT);
    else themeMode?.setThemeMode(Themes.DARK);
  };

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {Labels.title}
          </Typography>
          <SearchBar></SearchBar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="mode"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleModeChange}
              color="inherit"
            >
              {themeMode?.themeMode === Themes.DARK ? (
                <LightMode />
              ) : (
                <DarkMode />
              )}
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
                <Typography>
                  {(shoppingcartData?.cartItems !== 0 ||
                    shoppingcartData !== null) &&
                    shoppingcartData?.cartItems}
                </Typography>
                <ShoppingCartSharp />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="cart of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => navigate("/adminBooks")}
                color="inherit"
              >
                <LibraryAdd />
              </IconButton>
            )}

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

            {userDetails?.userDetails.userId !== -1 ? (
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
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="mode"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleModeChange}
              color="inherit"
            >
              {themeMode?.themeMode === Themes.DARK ? (
                <LightMode />
              ) : (
                <DarkMode />
              )}
            </IconButton>
            {userDetails?.userDetails.userId !== -1 ? (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
