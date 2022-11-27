import React from "react";
import { createContext, useState } from "react";
import { BookDetails } from "../components/book/DetailsCard";
import { CartActions, Toast } from "../constants/Enums";
import showToast from "../utils/Toastify";

export interface ICartContext {
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  cartItems: CartItems[];
  updateCart: (_: BookDetails, action: CartActions) => void;
}

export interface ICartContextProviderProps {
  children?: React.ReactNode;
}

export interface CartItems {
  book: BookDetails;
  quantity: number;
}

export const ShoppingCartContext = createContext<ICartContext | undefined>(
  undefined
);

export default function CartContextProvider({
  children,
}: ICartContextProviderProps) {
  const [itemCount, setItemCount] = useState(0);

  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const updateCart = (book: BookDetails, action: CartActions) => {
    setCartItems((cartItems) => {
      let flag = false;
      cartItems.map((cartItem, index) => {
        if (cartItem.book.bookId === book.bookId) {
          if (action === CartActions.ADD) {
            cartItem.quantity += 1;
            showToast(Toast.SUCCESS, "Book added to cart");
          }
          if (action === CartActions.REDUCE && cartItem.quantity > 1)
            cartItem.quantity -= 1;
          if (action === CartActions.REMOVE) cartItems.splice(index, 1);
          flag = true;
        }
      });
      if (!flag) {
        cartItems.push({ book: book, quantity: 1 });
        showToast(Toast.SUCCESS, "Book added to cart");
      }
      setItemCount(cartItems.length);
      console.log(cartItems);
      return [...cartItems];
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ itemCount, setItemCount, cartItems, updateCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
