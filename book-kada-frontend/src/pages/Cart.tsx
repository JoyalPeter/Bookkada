import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContents from "../components/cart/CartContents";
import useCheckoutCart from "../components/cart/CheckoutCart";
import { ShoppingCartContext } from "../store/Shoppingcart_Context";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import CentreBox from "../UI/CenterBox";
import LoadedComponent from "../UI/LoadedComponent";
import Padding from "../UI/Padding";
import RightBox from "../UI/RightBox";

export default function CartPage() {
  const shoppingCartContext = useContext(ShoppingCartContext);
  const cartItems = shoppingCartContext?.cartItems;
  const navigate = useNavigate()
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
                <Button onClick={checkout} variant="contained">
                  Proceed to checkout
                </Button>
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
