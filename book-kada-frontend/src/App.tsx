import { Theme, ThemeProvider, Paper, CssBaseline } from '@mui/material';
import './App.css';
import Router from './router/Router';
import useCustomTheme from './theme/ColorTheme';
import Toast from './UI/Toast';
function App() {
  const theme: Theme = useCustomTheme();
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toast />
      <Router />
    </ThemeProvider>
  );
}

export default App;
