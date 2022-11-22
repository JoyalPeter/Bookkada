import { FC, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating, Button, Typography } from "@mui/material";
import CentreBox from "../UI/CenterBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Padding from "../UI/Padding";
import LeftBox from "../UI/LeftBox";
import ViewReview from "../BookDetails/ViewReview";

interface DetailsProps {}

const Details: FC<DetailsProps> = ({}) => {
  const [addflag, setAddflag] = useState(false);

  return (
    <Padding>
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
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </Typography>
          </LeftBox>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>

          <CentreBox>
            <Box sx={{ display: "flex", gap: 5 }}>
              <Button
                variant="contained"
                color="success"
                endIcon={<AddShoppingCartIcon />}
              >
                Add To Cart
              </Button>
            </Box>
          </CentreBox>
        </CardContent>
      </Card>

      <h1>Reviews</h1>
      <ViewReview />
    </Padding>
  );
};

export default Details;
