import { FC, useState } from "react";

import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating, Button, TextField, Grid } from "@mui/material";
import CentreBox from "./components/centerBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Padding from "./components/padding";
import LeftBox from "./components/leftBox";

interface DetailsProps {}

const Details: FC<DetailsProps> = ({}) => {
  const [addflag, setAddflag] = useState(false);
  const [viewflag, setViewflag] = useState(false);
  const [ratingvalue, setRatingValue] = useState(0);
  const [reviewdata, setReviewData] = useState('');
  


  function addReview() {
    setAddflag(!addflag);
  }
  function viewReview() {
    setViewflag(!viewflag);
  }
  function reviewSubmit(){
    setAddflag(!addflag);

  }
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
            image="/static/images/cards/contemplative-reptile.jpg"
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
              <Button variant="contained" color="success" onClick={addReview}>
                Add Review
              </Button>
              <Button variant="contained" color="success" onClick={viewReview}>
                View Review
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<AddShoppingCartIcon />}
              >
                Add To Cart
              </Button>
            </Box>
          </CentreBox>

          {addflag && (
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ display: "flex", gap: 3 }}
            >
              Review : <TextField variant="outlined" size="small" onChange={(e)=>setReviewData(e.target.value)}/>
              Rating :{" "}
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={(event, newRatingValue) => {setRatingValue(ratingvalue)}}/>
              <Button variant="contained" color="success" onClick={reviewSubmit}>
                Submit
              </Button>
            </Typography>
          )}
        </CardContent>
      </Card>

      {viewflag&&
      <h1>Reviews</h1>
      }
    </Padding>
  );
};

export default Details;
