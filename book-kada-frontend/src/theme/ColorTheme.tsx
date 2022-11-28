import {
  createTheme,
  Shadows,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";

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
              light: purple[300],
              main: purple[400],
              dark: purple[500],
            },
            secondary: { light: grey[100], main: grey[400], dark: grey[800] },
          },
    shadows: Array(25).fill("none") as Shadows,
  };

  const theme: Theme = createTheme(themeProperties);
  return theme;
}
