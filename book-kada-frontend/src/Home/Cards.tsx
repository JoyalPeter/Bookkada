import { Card, CardMedia, CardContent, CardActions, Typography, ThemeProvider, ButtonBase } from "@mui/material";
import * as React from 'react';
import Cart from "./Shoppingcart";
import Favorites from "./Addfavorite";
import Ratings from "../UI/Rating";
import Details from "../pages/details";
import { useNavigate } from "react-router-dom";

export default function Cards () {
  const navigate = useNavigate()
  
  return (
    <>
      <Card
        sx={{ maxWidth: 275, boxShadow: 5 }}
        
      >
        <ButtonBase 
        onClick={()=>navigate(`details/:id`) }
        // console.log("kitti")
        >

        </ButtonBase>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="book1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Book1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Cart /> <Favorites /> <Ratings />
        </CardActions>
      </Card>
    </>
  );
}

