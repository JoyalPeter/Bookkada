import Padding from "../../UI/Padding";
import {
  Avatar,
  Card,
  Container,
  Grid,
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

export interface UserDetails {
  name?: string;
  email?: string;
  password?: string;
}

export default function ProfileModule() {
  const usercontext = useContext(UserContext);
  const [response, setResponse] = useState<UserDetails | null>(null);
  const { makeApiCall, loadingFlag } = useApiService();
  const [updatenameflag, setNameflag] = useState(true);
  const [updatePasswordflag, setPasswordflag] = useState(true);

  const [newName, setNewName] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const userid = usercontext?.userDetails.userId;
  useEffect(() => {
    makeApiCall(Method.GET, `users/${userid}`).then((response: UserDetails) => {
      setResponse(response);
    });
  }, []);
  function updateName() {
    setNameflag(!updatenameflag);
  }
  function updatePassword() {
    setPasswordflag(!updatePasswordflag);
  }
  function userNameUpdated() {
    setNameflag(!updatenameflag);
    makeApiCall(Method.PATCH, `users/updateUser/${userid}`, {
      name: newName
    }).catch((error) => showToast(Toast.ERROR, error));
  }
  function userPasswordUpdated() {
    setPasswordflag(!updatePasswordflag);
    makeApiCall(Method.PATCH, `users/updateUser/${userid}`, {
      password: newPassword
    }).catch((error) => showToast(Toast.ERROR, error));
  }

  return (
    <LoadedComponent loadingFlag={loadingFlag}>
      <Padding>
        {response && (
          <Card>
            <Container component="main" maxWidth="xs">
              <CenterBox sx={{ marginTop: 10 }}>
                <Avatar
                  src="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",

                    width: 200,
                    height: 200,
                  }}
                />

                <Typography component="h1" variant="h5">
                  Profile
                </Typography>
                {updatenameflag ? (
                  <>
                    <Typography component="h1" variant="h5">
                      Name : {response.name}
                      <IconButton
                        onClick={updateName}
                        sx={{ mt: 3, mb: 3 }}
                        aria-label="delete"
                      >
                        <EditIcon />
                      </IconButton>
                    </Typography>
                  </>
                ) : (
                  <>
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
                    <IconButton onClick={userNameUpdated}>
                      <BuildIcon />
                    </IconButton>
                  </>
                )}
                <Grid>
                  <Typography component="h1" variant="h5">
                    Email : {response.email}
                  </Typography>
                </Grid>
                {updatePasswordflag ? (
                  <>
                    <Typography component="h1" variant="h5">
                      Password{" "}
                      <IconButton
                        onClick={updatePassword}
                        sx={{ mt: 3, mb: 3 }}
                        aria-label="delete"
                      >
                        <EditIcon />
                      </IconButton>
                    </Typography>
                  </>
                ) : (
                  <>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Password"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => setnewPassword(e.target.value)}
                        />
                        <IconButton onClick={userPasswordUpdated}>
                          <BuildIcon />
                        </IconButton>
                  </>
                )}
              </CenterBox>
            </Container>
          </Card>
        )}
      </Padding>
    </LoadedComponent>
  );
}
