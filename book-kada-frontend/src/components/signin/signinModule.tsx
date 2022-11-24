import React from "react";
import {
  Avatar,
  Typography,
  Container,
  Button,
  TextField,
  Link,
  Grid,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CenterBox from "../../UI/CenterBox";
import useSigninValidate from "./signinValdations";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/Toastify";
import { Method, Toast } from "../../constants/enums";
import useApiService from "../../hooks/UseApiService";
import Spinner from "../../UI/Spinner";

export default function SignIn() {
  const navigate = useNavigate();
  const { validateSignin, errorTexts } = useSigninValidate();
  const { makeApiCall, loadingFlag } = useApiService();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email") as string | null;
    let password = data.get("password") as string | null;
    if (validateSignin(email, password)) {
      makeApiCall(Method.POST, "signin", { email, pass: password })
        .then((response) => {
          localStorage.setItem("userId", JSON.stringify(response));
          setTimeout(() => navigate("/"), 50);
        })
        .catch((error) => {
          showToast(Toast.ERROR, error);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CenterBox sx={{ marginTop: 20 }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            error={errorTexts.usernameError !== "" ? true : false}
            helperText={errorTexts.usernameError}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={errorTexts.passwordError !== "" ? true : false}
            helperText={errorTexts.passwordError}
            autoComplete="current-password"
          />

          {loadingFlag ? (
            <Spinner />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </CenterBox>
    </Container>
  );
}
