import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
export default function NoAccess() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Oops!!
          </Typography>
          <br />
          <Typography component="h1" variant="h5">
            You dont have access to this page
          </Typography>
        </Box>
      </Container>
    </>
  );
}
