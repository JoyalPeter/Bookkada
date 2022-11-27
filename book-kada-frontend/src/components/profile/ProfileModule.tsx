import Padding from "../../UI/Padding";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/User_Context";
import useApiService from "../../hooks/UseApiService";
import { Method } from "../../constants/Enums";

export interface IAppProps {}

export interface UserDetails {
  name?: string;
  email?: string;
  password?: string;
}

export default function ProfileModule(props: IAppProps) {
  const usercontext = useContext(UserContext);
  const [response, setResponse] = useState<UserDetails | null>(null);
  const { makeApiCall, loadingFlag } = useApiService();
  const [updateflag, setupdateflag] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const userid = usercontext?.userDetails.userId;
  useEffect(() => {
    makeApiCall(Method.GET, `users/${userid}`).then((response: UserDetails) => {
      setResponse(response);
    });
  });
  function updateUserProfile() {
    setupdateflag(!updateflag);
  }
  function userProfileUpdated() {
    makeApiCall(Method.PATCH, `users/updateUser/${userid}`, {
      name: newName,
      email: newEmail,
    }).then((response: UserDetails) => {});
  }

  return (
    <>
      <Padding>
        {response && (
          <Card
            sx={{
              width: 1,
              display: "grid",
              gap: 1,
              height: 200,
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                height="100%"
                width="100%"
                image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
                alt="green iguana"
              />
            </Box>
            <Box>
              {/* <CentreBox> */}
              <Typography variant="h5">Name : {response.name}</Typography>
              <Typography variant="h5"> Email : {response.email} </Typography>
              <Button onClick={updateUserProfile}>Update</Button>
              {/* </CentreBox> */}
            </Box>
            <Box>
              <Typography>
                {updateflag && (
                  <Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                    <Button onClick={userProfileUpdated}>Update</Button>
                  </Box>
                )}
              </Typography>
            </Box>
          </Card>
        )}
      </Padding>
    </>
  );
}
