import React, { useContext, useEffect, useState } from "react";

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
import { UserContext } from "../../store/User_Context";
import { Role } from "../../constants/Enums";

interface DetailsProps {
  bookDetails: BookDetails | null | undefined;
}

export default function DetailsSubCard({ bookDetails }: DetailsProps) {
  const userContext = useContext(UserContext);
  const [addReviewFlag, setaddReviewFlag] = useState(false);
  function addReview() {
    setaddReviewFlag(!addReviewFlag);
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
              value={2.5}
              precision={0.5}
              readOnly
            />
          </Typography>
        </LeftBox>
        <Typography gutterBottom variant="h3" component="div">
          {bookDetails?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {bookDetails?.author}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${bookDetails?.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bookDetails?.description}
        </Typography>
        {userContext?.userDetails.role !== Role.ADMIN && (
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
        )}
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
