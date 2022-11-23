import Padding from "../../UI/Padding";
import { Grid } from "@mui/material";
import Cards from "./Cards";

export default function UserPage() {
  return (
    <Padding>
      <Grid
        container
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        <Cards />
      </Grid>
    </Padding>
  );
}
