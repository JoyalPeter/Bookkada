import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import Ratings from '../../UI/Rating';
import Favorites from '../Home/Addfavorite';
import Cart from '../Home/Shoppingcart';
import { BookData } from '../../constants/Interfaces';
import EditModal from './EditModal';
import useApiService from '../../hooks/UseApiService';
import { Method, Toast } from '../../constants/Enums';
import showToast from '../../utils/Toastify';

interface IListItems {
  bookData: BookData;
  setData: Function;
}

export default function ListItems(props: IListItems) {
  const navigate = useNavigate();
  const [adminFlag, setAdminFlag] = useState(true);
  const { makeApiCall, loadingFlag } = useApiService();
  const [editFlag, setEditFlag] = useState(false);

  function deleteBook(id: number) {
    makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
      .then((response: BookData[]) => {
        props.setData(response);
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
            >
              {props.bookData.description}
            </Typography>
          </>
        </CardContent>
        <CardActions>
          {adminFlag ? (
            <>
              <Button variant="contained" onClick={() => setEditFlag(true)}>
                Edit
              </Button>
              <Button variant="contained" onClick={() => deleteBook(props.bookData.bookId)}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Cart />
              <Favorites />
              <Ratings />
            </>
          )}
        </CardActions>
      </Card>
      {editFlag && (
        <EditModal
          setEditFlag={setEditFlag}
          bookData={props.bookData}
          setData={props.setData}
        />
      )}
    </>
  );
}
