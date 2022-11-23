import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  ButtonBase,
} from "@mui/material";
import Cart from "./Shoppingcart";
import Favorites from "./Addfavorite";
import Ratings from "../../UI/Rating";
import { Method, Toast } from "../../constants/enums";
import useApiService from "../../hooks/UseApiService";
import Spinner from "../../UI/Spinner";
import showToast from "../../utils/Toastify";

export default function Cards() {
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();

  useEffect(() => {
    makeApiCall(Method.GET, "books/viewAllbooks")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }, []);

  return (
    <>
      {loadingFlag ? (
        <Spinner />
      ) : (
        <Card sx={{ maxWidth: 275, boxShadow: 5 }}>
          <ButtonBase
            onClick={() => navigate(`details/:id`)}
            // console.log("kitti")
          ></ButtonBase>
          <CardMedia
            component="img"
            height="140"
            image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
            alt="book1"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Book1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Cart /> <Favorites /> <Ratings />
          </CardActions>
        </Card>
      )}
    </>
  );
}
