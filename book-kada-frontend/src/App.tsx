import { Theme, ThemeProvider, Paper, CssBaseline } from "@mui/material";
import "./App.css";
import Router from "./router/router";
import useCustomTheme from "./theme/color-theme";
function App() {
  const theme: Theme = useCustomTheme();
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
