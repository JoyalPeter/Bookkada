import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Rating,
} from "@mui/material";
import Ratings from "../../UI/Rating";
import Favorites from "./Addfavorite";
import Cart from "./Shoppingcart";
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
        <CardActionArea>
          <CardContent onClick={() => navigate(`details/${props.bookId}`)}>
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
                noWrap
              >
                {props.description}
              </Typography>
            </>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Cart /> <Favorites />
          <Rating
            name="half-rating"
            defaultValue={props.rating!}
            precision={0.5}
            readOnly
          />
        </CardActions>
      </Card>
    </>
  );
}
