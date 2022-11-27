import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <Grid
        container
        paddingTop={1}
        alignItems="center"
        justifyContent="center"
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Card
          sx={{ width: "25%", minWidth: 275 }}
          onClick={() => {
            navigate("/");
          }}
        >
          <CardContent>books</CardContent>
        </Card>
        <Card
          sx={{ width: "25%", minWidth: 275 }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <CardContent>orders</CardContent>
        </Card>
        <Card
          sx={{ width: "25%", minWidth: 275 }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <CardContent>reviews</CardContent>
        </Card>
        <Card
          sx={{ width: "25%", minWidth: 275 }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <CardContent>Users</CardContent>
        </Card>
      </Grid>
    </>
  );
}
