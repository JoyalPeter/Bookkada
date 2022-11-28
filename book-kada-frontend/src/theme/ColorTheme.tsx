import {
  createTheme,
  Shadows,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";

import { useContext } from "react";
import { ThemeContext } from "../store/Theme_Context";
import { Themes } from "../constants/Enums";

export default function useCustomTheme(): Theme {
  const themeMode = useContext(ThemeContext);
  const themeProperties: ThemeOptions = {
    palette:
      themeMode?.themeMode === Themes.LIGHT
        ? {
            mode: themeMode?.themeMode,
            primary: {
              light: "#942994",
              main: "#3f143f",
              dark: "#942994",
            },
            secondary: { light: "#fb8860", main: "#e0714a", dark: "#e74f19" },
            background: {
              default: "#eee9ee",
              paper: "white",
            },
          }
        : {
            mode: themeMode?.themeMode,
            primary: {
              light: "#fb917c",
              main: "#ee674b",
              dark: "#eb5538",
            },
            secondary: { light: "#fa7d89", main: "#ed5866", dark: "#cc424f" },
            background: {
              default: "#252a38",
              paper: "50596f",
            },
          },
    shadows: Array(25).fill("none") as Shadows,
  };

  const theme: Theme = createTheme(themeProperties);
  return theme;
}
