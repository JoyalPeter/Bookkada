import React, { createContext } from 'react';

export const UserContext = createContext({});

export interface IUserContextProviderProps {
  children?: React.ReactNode;
}

export default function UserContextProvider({
  children,
}: IUserContextProviderProps) {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}
