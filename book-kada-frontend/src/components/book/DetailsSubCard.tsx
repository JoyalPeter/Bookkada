import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating, Button, Typography } from "@mui/material";
import CentreBox from "../../UI/CenterBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LeftBox from "../../UI/LeftBox";
import Review from "./AddReview";
import { BookDetails } from "./DetailsCard";
import { UserContext } from "../../store/User_Context";
import { CartActions, Role } from "../../constants/Enums";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";

interface DetailsProps {
  book: BookDetails | null | undefined;
}

export default function DetailsSubCard({ book }: DetailsProps) {
  const userContext = useContext(UserContext);
  const [addReviewFlag, setaddReviewFlag] = useState(false);
  const shoppingCartContext = useContext(ShoppingCartContext);
  function addReview() {
    setaddReviewFlag(!addReviewFlag);
  }

  return (
    <Card
      sx={{
        width: 1,
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={book?.cover}
          alt="green iguana"
        />
      </CardActionArea>

      <CardContent>
        <LeftBox>
          <Typography gutterBottom variant="h5" component="div">
            Rating :{" "}
            <Rating name="half-rating" value={2.5} precision={0.5} readOnly />
          </Typography>
        </LeftBox>
        <Typography gutterBottom variant="h3" component="div">
          {book?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {book?.author}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${book?.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book?.description}
        </Typography>
        {userContext?.userDetails.role !== Role.ADMIN && (
          <CentreBox>
            <Box sx={{ display: "flex", gap: 5 }}>
              <Button variant="contained" onClick={addReview}>
                Add Review
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  shoppingCartContext?.updateCart(book!, CartActions.ADD);
                }}
                endIcon={<AddShoppingCartIcon />}
              >
                Add To Cart
              </Button>
            </Box>
          </CentreBox>
        )}
        {addReviewFlag && (
          <Review
            addReviewFlag={addReviewFlag}
            setaddReviewFlag={setaddReviewFlag}
          />
        )}
      </CardContent>
    </Card>
  );
}
