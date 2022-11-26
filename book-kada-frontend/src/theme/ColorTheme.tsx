import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { purple, grey, yellow } from "@mui/material/colors";

import React, { useContext } from "react";
import { ThemeContext } from "../store/Theme_Context";
import { Themes } from "../constants/Enums";

export default function useCustomTheme(): Theme {
  const themeMode = useContext(ThemeContext);
  console.log(themeMode);
  const themeProperties: ThemeOptions = {
    palette:
      themeMode?.themeMode === Themes.LIGHT
        ? {
            mode: themeMode?.themeMode,
            primary: {
              light: purple[300],
              main: purple[400],
              dark: purple[500],
            },
            secondary: { light: grey[100], main: grey[400], dark: grey[800] },
            background: {
              paper: yellow[50],
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
  };

  const theme: Theme = createTheme(themeProperties);
  return theme;
}
