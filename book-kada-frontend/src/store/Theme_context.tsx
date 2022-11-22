import React, { useState, createContext } from "react";
import { Theme } from "../constants/enums";

export interface IThemeContext {
  themeMode: Theme;
  setThemeMode: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export interface IThemeContextProviderProps {
  children?: React.ReactNode;
}

export default function ThemeContextProvider({
  children,
}: IThemeContextProviderProps) {
  const [themeMode, setThemeMode] = useState(Theme.DARK);
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
