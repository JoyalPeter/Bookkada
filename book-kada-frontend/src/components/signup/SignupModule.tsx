import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CenterBox from "../../UI/CenterBox";
import { useNavigate } from "react-router-dom";
import useApiService from "../../hooks/UseApiService";
import useSignupValidate from "./SignupValdations";
import { Method, Role, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import Spinner from "../../UI/Spinner";

export default function SignUpModule() {
  const navigate = useNavigate();
  const { validateSignup, errorTexts } = useSignupValidate();
  const { makeApiCall, loadingFlag } = useApiService();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get("firstname") as string | null;
    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;
    if (validateSignup(firstname, email, password)) {
      makeApiCall(Method.POST, "users/signup", {
        name: firstname,
        email,
        password: password,
        role: Role.CLIENT,
      })
        .then((response) => {
          showToast(Toast.SUCCESS, "Signed up successfully");
          setTimeout(() => navigate("/signin", { replace: true }), 50);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="first name"
                error={errorTexts.nameError !== "" ? true : false}
                helperText={errorTexts.nameError}
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                error={errorTexts.emailError !== "" ? true : false}
                helperText={errorTexts.emailError}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={errorTexts.passwordError !== "" ? true : false}
                helperText={errorTexts.passwordError}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {loadingFlag ? (
            <Spinner />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </CenterBox>
    </Container>
  );
}
