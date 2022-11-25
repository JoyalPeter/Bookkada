import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { Role } from "../constants/Enums";

export interface UserContextProps {
  userDetails: userDetailsProps;
  setUserDetails: React.Dispatch<React.SetStateAction<userDetailsProps>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export interface IUserContextProviderProps {
  children?: React.ReactNode;
}

export interface userDetailsProps {
  userId: number;
  role: string;
}

export default function UserContextProvider({
  children,
}: IUserContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<userDetailsProps>({
    role: "",
    userId: -1,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let tokenstring = localStorage.getItem("token");
      setToken(tokenstring);
    }
  }, []);

  useEffect(() => {
    if (token) {
      let decodedToken: userDetailsProps = jwtDecode(token!);
      setUserDetails({
        userId: decodedToken.userId,
        role: decodedToken.role,
      });
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
