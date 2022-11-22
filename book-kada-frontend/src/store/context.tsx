import * as React from "react";
import BooksContextProvider from "./Books_context";
import ThemeContextProvider from "./Theme_context";
import UserContextProvider from "./User_context";

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
