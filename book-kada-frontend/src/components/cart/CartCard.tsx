import { useContext } from "react";
import {
  CardActionArea,
  Typography,
  IconButton,
  CardMedia,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";

import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { Box } from "@mui/system";
import CentreBox from "../../UI/CenterBox";
import { BookDetails } from "../book/DetailsCard";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import { CartActions } from "../../constants/Enums";

export interface ICartCardProps {
  book: BookDetails;
  quantity: number;
}

export default function CartCard({ book, quantity }: ICartCardProps) {
  const shoppingCartContext = useContext(ShoppingCartContext);
  return (
    <div>
      <Card
        sx={{
          width: 1,
          display: "grid",
          gap: 1,
          margin: 2,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            width="100%"
            image="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg"
            alt="green iguana"
          />
        </CardActionArea>

        <Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {book.name}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              Author: {book.author}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Price: ${book.price}
            </Typography>
          </CardContent>
        </Box>
        <Box>
          <Stack direction={"column"}>
            <IconButton
              size="large"
              onClick={() =>
                shoppingCartContext?.updateCart(book, CartActions.ADD)
              }
            >
              <ArrowDropUp />
            </IconButton>
            <CentreBox>{quantity}</CentreBox>
            <IconButton
              size="large"
              onClick={() =>
                shoppingCartContext?.updateCart(book, CartActions.REDUCE)
              }
            >
              <ArrowDropDown />
            </IconButton>
          </Stack>
        </Box>
        <Box>
          <Stack direction="column">
            <CentreBox>
              <Typography>
                <CentreBox>{`Total: ${book.price * quantity}`}</CentreBox>
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  shoppingCartContext?.updateCart(book, CartActions.REMOVE);
                }}
              >
                Remove
              </Button>
            </CentreBox>
          </Stack>
        </Box>
      </Card>
    </div>
  );
}
