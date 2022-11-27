import Padding from "../../UI/Padding";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/User_Context";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import LoadedComponent from "../../UI/LoadedComponent";
import CenterBox from "../../UI/CenterBox";
import { EmailOutlined } from "@mui/icons-material";

export interface UserDetails {
  name?: string;
  email?: string;
  password?: string;
}

export default function ProfileModule() {
  const usercontext = useContext(UserContext);
  const [response, setResponse] = useState<UserDetails | null>(null);
  const { makeApiCall, loadingFlag } = useApiService();
  const [updateflag, setupdateflag] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const userid = usercontext?.userDetails.userId;
  useEffect(() => {
    makeApiCall(Method.GET, `users/${userid}`).then((response: UserDetails) => {
      setResponse(response);
    });
  }, []);
  function updateUserProfile() {
    setupdateflag(!updateflag);
  }
  function userProfileUpdated() {
    makeApiCall(Method.PATCH, `users/updateUser/${userid}`, {
      name: newName,
      password: newPassword,
    }).catch((error) => showToast(Toast.ERROR, error));
  }

  return (
    <LoadedComponent loadingFlag={loadingFlag}>
      <Padding>
        {response && (
          <Card sx={{ marginTop: 10 }}>
            <Container component="main" maxWidth="xs">
              <CenterBox sx={{ marginTop: 10 }}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",

                    width: 200,
                    height: 200,
                  }}
                />
                <Typography component="h1" variant="h5">
                  {response.name}
                </Typography>
                <Stack
                  sx={{ alignItems: "center" }}
                  spacing={1}
                  direction="row"
                >
                  <EmailOutlined />
                  <Typography component="h1" variant="h6">
                    {response.email}
                  </Typography>
                </Stack>
                <Grid container justifyContent="center">
                  <IconButton
                    onClick={updateUserProfile}
                    sx={{ mt: 3, mb: 2 }}
                    aria-label="delete"
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                {updateflag && (
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="firstname"
                          required
                          fullWidth
                          id="first name"
                          label={`${response.name}`}
                          autoFocus
                          onChange={(e) => setNewName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Password"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => setnewPassword(e.target.value)}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label={``}
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid> */}
                      <Grid item xs={12} container justifyContent="center">
                        <IconButton onClick={userProfileUpdated}>
                          <BuildIcon />
                        </IconButton>
                      </Grid>
                    </Grid>

                    {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained" 
                > */}
                  </Box>
                )}
              </CenterBox>
            </Container>
          </Card>
        )}
      </Padding>
    </LoadedComponent>
  );
}
