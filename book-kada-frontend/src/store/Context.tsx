import React from 'react';
import BooksContextProvider from './Books_Context';
import ThemeContextProvider from './Theme_Context';
import UserContextProvider from './User_Context';

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
