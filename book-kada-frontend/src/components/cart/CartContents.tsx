import React, { useContext } from "react";
import {
  CartItems,
  ShoppingCartContext,
} from "../../store/Shoppingcart_Context";
import Padding from "../../UI/Padding";
import { BookDetails } from "../book/DetailsCard";
import CartCard from "./CartCard";

export interface ICartContentsProps {
  cartItems: CartItems[];
}

export default function CartContents({ cartItems }: ICartContentsProps) {
  return (
    <Padding>
      {cartItems.map((cartItem, index) => (
        <CartCard
          key={index}
          book={cartItem.book}
          quantity={cartItem.quantity}
        />
      ))}
    </Padding>
  );
}
