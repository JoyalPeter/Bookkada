import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Rating,
  Button,
} from "@mui/material";
import Ratings from "../../UI/Rating";
import Favorites from "./Addfavorite";
import Cart from "./Shoppingcart";
import { BookDataProps } from "./HomeComponent";
import { Method, ModalUse, Role, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookContext } from "../../store/Book_Context";
import showToast from "../../utils/Toastify";
import { UserContext } from "../../store/User_Context";
import DetailsModal from "../Admin/DetailsModal";

interface ICards {
  bookData: BookDataProps;
}

export default function Cards(props: ICards) {
  const quantity = 0;
  const navigate = useNavigate();
  const bookContext = useContext(BookContext);
  const userContext = useContext(UserContext);
  const [adminFlag, setAdminFlag] = useState(
    userContext?.userDetails.role === Role.ADMIN
  );
  const { makeApiCall, loadingFlag } = useApiService();
  const [editFlag, setEditFlag] = useState(false);


  function deleteBook(id: number) {
    makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
      .then((response: BookDataProps[]) => {
        bookContext?.setAllBooks(response);
        showToast(Toast.SUCCESS, "Delete Successful");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }
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
          <CardContent
            onClick={() => {
              if (!adminFlag) navigate(`details${props.bookData.bookId}`);
            }}
          >
            <>
              <Typography gutterBottom variant="h5" component="div">
                <b>{props.bookData.name}</b>
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>{props.bookData.author}</b>
              </Typography>
              <Typography variant="body1" color="text.secondary" fontSize={16}>
                <b>$</b>
                {props.bookData.price}
              </Typography>
              <Typography
                fontFamily={"monospace"}
                fontWeight={"light"}
                variant="subtitle2"
                color="text.secondary"
                component="div"
                noWrap
              >
                {props.bookData.description}
              </Typography>
            </>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {adminFlag ? (
            <>
              <Button variant="contained" onClick={() => setEditFlag(true)}>
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => deleteBook(props.bookData.bookId)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Cart /> <Favorites />
              <Rating
                name="half-rating"
                defaultValue={props.bookData.rating!}
                precision={0.5}
                readOnly
              />
            </>
          )}
        </CardActions>
      </Card>
      {editFlag && (
        <DetailsModal
          setFlag={setEditFlag}
          bookData={props.bookData}
          modalUse={ModalUse.EDIT}
        />
      )}
    </>
  );
}
