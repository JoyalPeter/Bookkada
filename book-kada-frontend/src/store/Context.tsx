import React from "react";
import BooksContextProvider from "./Book_Context";
import CartContextProvider from "./Shoppingcart_Context";
import ViewResponseProvider from "./Book_Context";
import ThemeContextProvider from "./Theme_Context";
import UserContextProvider from "./User_Context";

export interface IContextProps {
  children?: React.ReactNode;
}

export default function ContextProvider({ children }: IContextProps) {
  return (
    <CartContextProvider>
      <ViewResponseProvider>
        <CartContextProvider>
          <ThemeContextProvider>
            <UserContextProvider>
              <BooksContextProvider>{children}</BooksContextProvider>
            </UserContextProvider>
          </ThemeContextProvider>
        </CartContextProvider>
      </ViewResponseProvider>
    </CartContextProvider>
  );
}
