import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating, Button, Typography } from "@mui/material";
import CentreBox from "../../UI/CenterBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LeftBox from "../../UI/LeftBox";
import Review from "./AddReview";
import { BookDetails } from "./DetailsCard";

interface DetailsProps {
  resp: BookDetails | null;
}

export default function DetailsSubCard({ resp }: DetailsProps) {
  const [addReviewFlag, setaddReviewFlag] = useState(false);
  let reviewSum = 0;
  let reviewAvg = 0;
  let totalNumberOfReview = 0;
  function addReview() {
    setaddReviewFlag(!addReviewFlag);
  }
  console.log(resp);
  if (resp) {
    //  console.log("rating", resp.ratings);
    totalNumberOfReview = resp.ratings.length;
    resp.ratings.map((item) => (reviewSum = reviewSum + item.rating));
    reviewAvg = reviewSum / totalNumberOfReview;
  }
  return (
    <Card
      sx={{
        width: 1,
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
          alt="green iguana"
        />
      </CardActionArea>

      <CardContent>
        <LeftBox>
          <Typography gutterBottom variant="h5" component="div">
            Rating :{" "}
            <Rating
              name="half-rating"
              defaultValue={resp?.ratings[0].rating}
              precision={0.5}
              readOnly
            />
          </Typography>
        </LeftBox>
        <Typography gutterBottom variant="h3" component="div">
          {resp?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {resp?.author}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${resp?.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {resp?.description}
        </Typography>
        <CentreBox>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Button variant="contained" onClick={addReview}>
              Add Review
            </Button>
            <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
              Add To Cart
            </Button>
          </Box>
        </CentreBox>
        {addReviewFlag && (
          <Review
            addReviewFlag={addReviewFlag}
            setaddReviewFlag={setaddReviewFlag}
          />
        )}
      </CardContent>
    </Card>
  );
}
