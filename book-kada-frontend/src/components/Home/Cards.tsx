import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  ButtonBase,
  useMediaQuery,
} from "@mui/material";
import Cart from "./Shoppingcart";
import Favorites from "./Addfavorite";
import Ratings from "../../UI/Rating";
import { Method, Toast } from "../../constants/enums";
import useApiService from "../../hooks/UseApiService";
import Spinner from "../../UI/Spinner";
import showToast from "../../utils/Toastify";
import { BookDataProps } from "./HomeComponent";

export default function Cards(props:BookDataProps) {
const navigate = useNavigate()
const {  spinnerFlag } = useApiService();
// const matches = useMediaQuery("(min-width:600px)");

  return (
    <>
        
      {spinnerFlag ? (
        <Spinner />
      ) : (
        <Card
          onClick={() => navigate(`details/${props.bookId}`)}
          sx={{ maxWidth: 275, boxShadow: 5 }}
        >
          <CardMedia
            component="img"
            height="140"
            image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
            alt="book1"
          />
          <CardContent>
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
                fontSize={14}
                fontWeight={75}
                fontFamily={"Arial"}
                variant="body2"
                color="text.secondary"
              >
                <b>{props.description}</b>
              </Typography>
            </>
          </CardContent>
          <CardActions>
            <Cart /> <Favorites /> <Ratings />
          </CardActions>
        </Card>
      )}
    </>
  );
}
