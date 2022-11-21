import * as React from "react";
import BooksContextProvider from "./books_context";
import UserContextProvider from "./user_context";

export interface IContextProps {
  children?: React.ReactNode;
}

export default function ContextProvider({ children }: IContextProps) {
  return (
    <div>
      <UserContextProvider>
        <BooksContextProvider>{children}</BooksContextProvider>
      </UserContextProvider>
    </div>
  );
}
