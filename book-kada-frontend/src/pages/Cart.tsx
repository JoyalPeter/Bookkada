import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import CartCard from "../components/cart/CartCard";
import CartContents from "../components/cart/CartContents";
import { ShoppingCartContext } from "../store/Shoppingcart_Context";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import CentreBox from "../UI/CenterBox";
import Padding from "../UI/Padding";
import RightBox from "../UI/RightBox";

export default function CartPage() {
  const shoppingCartContext = useContext(ShoppingCartContext);
  const cartItems = shoppingCartContext?.cartItems;
  return (
    <>
      <PrimarySearchAppBar />
      {cartItems?.length !== 0 ? (
        <>
          <CartContents cartItems={cartItems!} />
          <Padding>
            <RightBox>
              <Button variant="contained">Proceed to checkout</Button>
            </RightBox>
          </Padding>
        </>
      ) : (
        <Padding>
          <CentreBox>
            <Typography variant="h5">Cart is Empty</Typography>
          </CentreBox>
        </Padding>
      )}
    </>
  );
}
