import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={1}>
        <Card
          sx={{ width: "30%", minWidth: 275 }}
          onClick={() => {
            navigate("/");
          }}
        >
          <CardContent>books</CardContent>
        </Card>
        <Card
          sx={{ width: "30%", minWidth: 275 }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <CardContent>orders</CardContent>
        </Card>
        <Card
          sx={{ width: "30%", minWidth: 275 }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          <CardContent>analytics</CardContent>
        </Card>
      </Grid>
    </>
  );
}
