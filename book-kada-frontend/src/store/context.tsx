import React from "react";
import BooksContextProvider from "./books_context";
import ThemeContextProvider from "./Theme_context";
import UserContextProvider from "./user_context";

export interface IContextProps {
  children?: React.ReactNode;
}

export default function ContextProvider({ children }: IContextProps) {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <BooksContextProvider>{children}</BooksContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}
