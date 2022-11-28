import {
  Theme,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import Router from "./router/Router";
import useCustomTheme from "./theme/ColorTheme";
import Toast from "./UI/Toast";

function App() {
  const [loadingPage, setLoadingPage] = useState(true);
  setTimeout(() => setLoadingPage(false), 500);
  const theme: Theme = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toast />
      {loadingPage ? <LinearProgress /> : <Router />}
    </ThemeProvider>
  );
}

export default App;
