import { ShoppingCartCheckout } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import OrderCard from "../components/orders/OrderCard";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import CentreBox from "../UI/CenterBox";
import Padding from "../UI/Padding";
import RightBox from "../UI/RightBox";

export default function OrderPage() {
  return (
    <div>
      <PrimarySearchAppBar />
      <Padding>
        <CentreBox>
          <h1> Orders </h1>
        </CentreBox>
        <OrderCard sx={{ height: "100%" }} />
      </Padding>
      <CentreBox>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Button variant="contained" endIcon={<ShoppingCartCheckout />}>
            Buy Now
          </Button>
        </Box>
      </CentreBox>
    </div>
  );
}
