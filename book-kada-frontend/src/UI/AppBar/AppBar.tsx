import { AppBar, Box, Toolbar, Link, Typography } from "@mui/material";
import { Labels } from "../../constants/Labels";
import { useContext, useState } from "react";
import SearchBar from "./Search";
import useMenu from "./Menu";
import useMobileMenu from "./MobileMenu";
import { ThemeContext } from "../../store/Theme_Context";
import { ModalUse, Themes } from "../../constants/Enums";
import DetailsModal from "../../components/Admin/DetailsModal";
import MainAppBar from "./MainAppBar";
import MobileAppBar from "./MobileAppBar";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const [addFlag, setAddFlag] = useState(false);
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

  const { mobileMenuId, handleProfileMenuOpen, renderMobileMenu } =
    useMobileMenu({
      anchorEl,
      setAnchorEl,
    });

  const handleModeChange = () => {
    if (themeMode?.themeMode === Themes.DARK)
      themeMode?.setThemeMode(Themes.LIGHT);
    else themeMode?.setThemeMode(Themes.DARK);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar enableColorOnDark={true} position="static">
        <Toolbar>
          <Link onClick={() => navigate("/")}>
            <Typography
              variant="h6"
              noWrap
              color="white"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {Labels.title}
            </Typography>
          </Link>

          <SearchBar></SearchBar>
          <Box sx={{ flexGrow: 1 }} />
          <MainAppBar
            menuId={menuId}
            mobileMenuId={mobileMenuId}
            handleModeChange={handleModeChange}
            setAddFlag={setAddFlag}
            handleProfileMenuOpen={handleProfileMenuOpen}
          />

          <MobileAppBar
            menuId={menuId}
            mobileMenuId={mobileMenuId}
            handleModeChange={handleModeChange}
            setAddFlag={setAddFlag}
            handleProfileMenuOpen={handleProfileMenuOpen}
          />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {addFlag && (
        <DetailsModal
          setFlag={setAddFlag}
          modalUse={ModalUse.ADD}
        />
      )}
    </Box>
  );
}
