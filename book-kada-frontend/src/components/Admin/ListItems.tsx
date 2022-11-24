import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import Ratings from "../../UI/Rating";
import Favorites from "../Home/Addfavorite";
import { BookDataProps } from "../Home/HomeComponent";
import Cart from "../Home/Shoppingcart";
import EditIcon from "@mui/icons-material/Edit";


export default function ListItems(props: BookDataProps) {
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
              <b>{props.name}</b> <EditIcon fontSize="small" />
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              <b>{props.author}</b> <EditIcon fontSize="small" />
            </Typography>
            <Typography variant="body1" color="text.secondary" fontSize={16}>
              <b>$</b>
              {props.price} <EditIcon fontSize="small" />
            </Typography>
            <Typography
              fontFamily={"monospace"}
              fontWeight={"light"}
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {props.description} <EditIcon fontSize="small" />
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
