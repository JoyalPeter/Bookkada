import * as React from "react";
import { createContext, useState } from "react";

export interface ICartContext {
  cartItems: number;
  setCartItems: React.Dispatch<React.SetStateAction<number>>;
  books: Number[];
  setBooks: React.Dispatch<React.SetStateAction<Number[]>>;
}

export const ShoppingCartContext = createContext<ICartContext | undefined>(
  undefined
);

export interface ICartContextProviderProps {
  children?: React.ReactNode;
}

export default function CartContextProvider({
  children,
}: ICartContextProviderProps) {
  const [cartItems, setCartItems] = useState(0);

  const [books, setBooks] = useState<Number[]>([]);
  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, setCartItems, books, setBooks }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
