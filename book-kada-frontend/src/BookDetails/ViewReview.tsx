import * as React from "react";
import { FC, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating, Button, Typography } from "@mui/material";
import CentreBox from "../UI/CenterBox";
import LeftBox from "../UI/LeftBox";

export interface IAppProps {}

export default function ViewReview(props: IAppProps) {
  return (
    <div>
      <Card
        sx={{
          width: 1,
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        <CardContent>Name of User</CardContent>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Rating :{" "}
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
