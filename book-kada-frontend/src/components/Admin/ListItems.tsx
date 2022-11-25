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
import Favorites from '../home/Addfavorite';
import Cart from '../home/Shoppingcart';
import { BookData } from '../../constants/Interfaces';
import EditModal from './EditModal';

interface IListItems {
  bookData: BookData;
  setData: Function;
}

export default function ListItems(props: IListItems) {
  const navigate = useNavigate();
  const [adminFlag, setAdminFlag] = useState(true);
  const [editFlag, setEditFlag] = useState(false);

  
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
              fontFamily={'monospace'}
              fontWeight={'light'}
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
              <Button onClick={() => setEditFlag(true)}>Edit</Button>
              <Button>Delete</Button>
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
      {editFlag && <EditModal setEditFlag={setEditFlag} bookData={props.bookData} />}
    </>
  );
}
