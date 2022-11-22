import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchBar from "./search";
import useMenu from "./Menu";
import useMobileMenu from "./MobileMenu";
import { ThemeContext } from "../../store/Theme_context";
import { Theme } from "../../constants/enums";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Labels } from "../../constants/labels";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const themeMode = useContext(ThemeContext);
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
    if (themeMode?.themeMode === Theme.DARK)
      themeMode?.setThemeMode(Theme.LIGHT);
    else themeMode?.setThemeMode(Theme.DARK);
  };

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
              {themeMode?.themeMode === Theme.DARK ? (
                <LightMode />
              ) : (
                <DarkMode />
              )}
            </IconButton>
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
              {themeMode?.themeMode === Theme.DARK ? (
                <LightMode />
              ) : (
                <DarkMode />
              )}
            </IconButton>
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
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
