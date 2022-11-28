import { Typography } from "@mui/material";
import OrderCard from "../components/orders/OrderCard";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import CentreBox from "../UI/CenterBox";
import Padding from "../UI/Padding";

export default function OrderPage() {
  return (
    <>
      <PrimarySearchAppBar />
      <Padding>
        <CentreBox>
          <Typography variant="h4">Orders</Typography>
        </CentreBox>
        <OrderCard />
      </Padding>
    </>
  );
}
