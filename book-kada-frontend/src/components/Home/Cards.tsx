import { useContext, useState } from "react";
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
import Cart from "./Shoppingcart";
import { Method, ModalUse, Role, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookContext } from "../../store/Book_Context";
import showToast from "../../utils/Toastify";
import { UserContext } from "../../store/User_Context";
import DetailsModal from "../Admin/DetailsModal";
import { BookDetails } from "../book/DetailsCard";
import LoadedComponent from "../../UI/LoadedComponent";

interface ICards {
  book: BookDetails;
}

export default function Cards(props: ICards) {
  const navigate = useNavigate();
  const bookContext = useContext(BookContext);
  const userContext = useContext(UserContext);

  const { makeApiCall, loadingFlag } = useApiService();
  const [editFlag, setEditFlag] = useState(false);

  function deleteBook(id: number) {
    makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
      .then((response: BookDetails[]) => {
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
              navigate(`details/${props.book.bookId}`);
            }}
          >
            <>
              <Typography gutterBottom variant="h5" component="div">
                <b>{props.book.name}</b>
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>{props.book.author}</b>
              </Typography>
              <Typography variant="body1" color="text.secondary" fontSize={16}>
                <b>$</b>
                {props.book.price}
              </Typography>
              <Typography
                fontFamily={"monospace"}
                fontWeight={"light"}
                variant="subtitle2"
                color="text.secondary"
                component="div"
                noWrap
              >
                {props.book.description}
              </Typography>
            </>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {userContext?.userDetails.role === Role.ADMIN ? (
            <>
              <Button variant="contained" onClick={() => setEditFlag(true)}>
                Edit
              </Button>
              <LoadedComponent loadingFlag={loadingFlag}>
                <Button
                  variant="contained"
                  onClick={() => deleteBook(props.book.bookId)}
                >
                  Delete
                </Button>
              </LoadedComponent>
            </>
          ) : (
            <>
              <Cart book={props.book} />
              <Rating
                name="half-rating"
                defaultValue={props.book.rating!}
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
          bookData={props.book}
          modalUse={ModalUse.EDIT}
        />
      )}
    </>
  );
}
