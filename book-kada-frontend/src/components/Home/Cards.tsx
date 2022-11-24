import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import Cart from "./Shoppingcart";
import Favorites from "./Addfavorite";
import Ratings from "../../UI/Rating";
import { Method, Toast } from "../../constants/enums";
import useApiService from "../../hooks/UseApiService";
import Spinner from "../../UI/Spinner";
import showToast from "../../utils/Toastify";
import { BookDataProps } from "./HomeComponent";


export default function Cards(props: BookDataProps) {
  const navigate = useNavigate();
  return (
    <>
       
      <Card sx={{ maxWidth: 275, boxShadow: 5, m: 1, maxHeight: 500 }}>
        <CardMedia
          component="img"
          height="150"
          image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
          alt="name"
        />
        <CardContent onClick={() => navigate(`details`)}>
          <>
            <Typography gutterBottom variant="h5" component="div">
              <b>{props.name}</b>
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              <b>{props.author}</b>
            </Typography>
            <Typography variant="body1" color="text.secondary" fontSize={16}>
              <b>$</b>
              {props.price}
            </Typography>
            <Typography
              fontFamily={"monospace"}
              fontWeight={"light"}
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {props.description}
            </Typography>
          </>
        </CardContent>
        <CardActions>
          <Cart /> <Favorites /> <Ratings />
        </CardActions>
      </Card>
       
    </>
  );
}
