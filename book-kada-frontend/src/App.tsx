import {
  Theme,
  createTheme,
  ThemeProvider,
  Paper,
  CssBaseline,
} from "@mui/material";
import "./App.css";
import Router from "./router/router";
import ContextProvider from "./store/Context";
import useCustomTheme from "./theme/color-theme";

function App() {
  const theme: Theme = useCustomTheme();
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <CssBaseline />
        <Router />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
