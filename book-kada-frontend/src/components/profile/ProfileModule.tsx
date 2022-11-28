import Padding from "../../UI/Padding";
import {
  Avatar,
  Card,
  Container,
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
import { Email } from "@mui/icons-material";

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

  const [newName, setNewName] = useState("");
  const userid = usercontext?.userDetails.userId;
  useEffect(() => {
    makeApiCall(Method.GET, `users/${userid}`).then((response: UserDetails) => {
      setResponse(response);
    });
  }, [updatenameflag]);
  function updateName() {
    setNameflag(!updatenameflag);
  }

  function userNameUpdated() {
    makeApiCall(Method.PATCH, `users/updateUser/${userid}`, {
      name: newName,
    }).catch((error) => showToast(Toast.ERROR, error));
    setNameflag(!updatenameflag);
  }

  return (
    <LoadedComponent loadingFlag={loadingFlag}>
      <Padding>
        {response && (
          <Card sx={{ marginTop: 8 }}>
            <Container component="main" maxWidth="xs">
              <CenterBox sx={{ marginTop: 10 }}>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                    width: 100,
                    height: 100,
                  }}
                />
                {updatenameflag ? (
                  <>
                    <Typography component="h1" variant="h5">
                      {response.name}
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
                <Stack direction="row" alignItems="center">
                  <Email />
                  <Typography component="h1" variant="h5">
                    {response.email}
                  </Typography>
                </Stack>
              </CenterBox>
            </Container>
          </Card>
        )}
      </Padding>
    </LoadedComponent>
  );
}
