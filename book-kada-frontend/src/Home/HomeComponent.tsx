import * as React from "react";
import { useState } from "react";
import Padding from "../UI/Padding";
import { Grid } from "@mui/material";
import Cards from "./Cards";
import Cart from "./Shoppingcart";
import Favorites from "./Addfavorite";

export default function UserPage() {
  const [isActive, setisActive] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [tooltip, setTooltip] = useState("Add to Cart");
  const [favtip, setFavtip] = useState("Add to Favorites");
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
        <Cards/>
        <Cart/>
        <Favorites/>

      </Grid>
    </Padding>
  );
}
