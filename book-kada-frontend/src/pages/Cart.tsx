import { Typography } from "@mui/material";
import { useContext } from "react";
import CartContents from "../components/cart/CartContents";
import useCheckoutCart from "../components/cart/CheckoutCart";
import { ShoppingCartContext } from "../store/Shoppingcart_Context";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import Button from "../UI/Button";
import CentreBox from "../UI/CenterBox";
import LoadedComponent from "../UI/LoadedComponent";
import Padding from "../UI/Padding";
import RightBox from "../UI/RightBox";

export default function CartPage() {
  const shoppingCartContext = useContext(ShoppingCartContext);
  const cartItems = shoppingCartContext?.cartItems;
  const { checkout, loadingFlag } = useCheckoutCart();

  return (
    <>
      <PrimarySearchAppBar />
      {cartItems?.length !== 0 ? (
        <>
          <CartContents cartItems={cartItems!} />
          <Padding>
            <RightBox>
              <LoadedComponent loadingFlag={loadingFlag}>
                <Button onClick={checkout}>Proceed to checkout</Button>
              </LoadedComponent>
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
