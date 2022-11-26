import {
  DarkMode,
  LibraryAdd,
  LightMode,
  ShoppingCartSharp,
  Login,
  MoreVert,
  AccountCircle,
} from "@mui/icons-material";
import { AppBar, Box, Toolbar, IconButton, Typography, Tooltip, Avatar } from "@mui/material";
import { Labels } from "../../constants/Labels";
import { useContext, useState } from "react";
import SearchBar from "./Search";
import useMenu from "./Menu";
import useMobileMenu from "./MobileMenu";
import { ThemeContext } from "../../store/Theme_Context";
import { ModalUse, Role, Themes } from "../../constants/Enums";
import { UserContext } from "../../store/User_Context";
import useLogout from "../../hooks/UseLogout";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import DetailsModal from "../../components/Admin/DetailsModal";
import { BookContext } from "../../store/Book_Context";

interface IPrimarySearchAppBar {}
export default function PrimarySearchAppBar(props: IPrimarySearchAppBar) {
  const emptyBook = {
    bookId: 0,
    price: 0,
    description: "",
    author: "",
    name: "",
  };
  const bookContext = useContext(BookContext);
  const [addFlag, setAddFlag] = useState(false);
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
   console.log(userDetails);

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
                <Tooltip title="Switch to Light Mode">
                  <LightMode />
                </Tooltip>
              ) : (
                <Tooltip title="Switch to Dark Mode">
                  <DarkMode />
                </Tooltip>
              )}
            </IconButton>
            {userDetails?.userDetails.role !== Role.ADMIN ? (
              <Tooltip title="Cart">
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
              </Tooltip>
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
                onClick={() => navigate("/signin")}
                color="inherit"
              >
                <Login /> <Typography>Login</Typography>
              </IconButton>
            ) : (
              <Tooltip title={userDetails?.userDetails.name}>
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
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {userDetails?.userDetails.role !== Role.ADMIN ? (
              <Tooltip title="Cart">
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
              </Tooltip>
            ) : (
              <Tooltip title="Add books">
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
              </Tooltip>
            )}

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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {addFlag && (
        <DetailsModal
          setFlag={setAddFlag}
          bookData={emptyBook}
          modalUse={ModalUse.ADD}
        />
      )}
    </Box>
  );
}
