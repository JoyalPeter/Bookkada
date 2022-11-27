import { Typography } from "@mui/material";
import { CartItems } from "../../store/Shoppingcart_Context";
import Padding from "../../UI/Padding";
import RightBox from "../../UI/RightBox";
import CartCard from "./CartCard";

export interface ICartContentsProps {
  cartItems: CartItems[];
}

export default function CartContents({ cartItems }: ICartContentsProps) {
  let total = 0;
  cartItems.forEach(
    (cartItem) => (total += cartItem.book.price * cartItem.quantity)
  );
  return (
    <Padding>
      {cartItems.map((cartItem, index) => (
        <CartCard
          key={index}
          book={cartItem.book}
          quantity={cartItem.quantity}
        />
      ))}
      <RightBox>
        <Typography marginRight={1} variant="h5">
          Total:{" "}
        </Typography>
        <Typography color="secondary.main" variant="h6">
          ${total}
        </Typography>
      </RightBox>
    </Padding>
  );
}
