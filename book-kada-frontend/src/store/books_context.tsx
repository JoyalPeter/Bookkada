import React, { createContext } from "react";

export const BooksContext = createContext({});

export interface IBooksContextProviderProps {
  children?: React.ReactNode;
}

export default function BooksContextProvider({
  children,
}: IBooksContextProviderProps) {
  return <BooksContext.Provider value={{}}>{children}</BooksContext.Provider>;
}
