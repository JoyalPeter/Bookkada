import React, { useState, createContext } from "react";
import { Themes } from "../constants/enums";

export interface IThemeContext {
  themeMode: Themes;
  setThemeMode: React.Dispatch<React.SetStateAction<Themes>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export interface IThemeContextProviderProps {
  children?: React.ReactNode;
}

export default function ThemeContextProvider({
  children,
}: IThemeContextProviderProps) {
  const [themeMode, setThemeMode] = useState(Themes.LIGHT);
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
