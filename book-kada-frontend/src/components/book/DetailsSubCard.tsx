import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating, Typography } from "@mui/material";
import CentreBox from "../../UI/CenterBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LeftBox from "../../UI/LeftBox";
import Review from "./AddReview";
import { BookDetails } from "./DetailsCard";
import { UserContext } from "../../store/User_Context";
import {
  CartActions,
  Method,
  ModalUse,
  Role,
  Toast,
} from "../../constants/Enums";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import DetailsModal from "../Admin/DetailsModal";
import showToast from "../../utils/Toastify";
import useApiService from "../../hooks/UseApiService";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import DeleteConfirmation from "../../UI/DeleteConfirmation";

interface DetailsProps {
  book: BookDetails | null | undefined;
}

export default function DetailsSubCard({ book }: DetailsProps) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [addReviewFlag, setaddReviewFlag] = useState(false);
  const shoppingCartContext = useContext(ShoppingCartContext);
  const [editFlag, setEditFlag] = useState(false);
  const { makeApiCall } = useApiService();
  const [openFlag, setOpenFlag] = useState(false);

  function addReview() {
    setaddReviewFlag(!addReviewFlag);
  }

  function deleteBook(id: number) {
    makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
      .then((_: BookDetails[]) => {
        showToast(Toast.SUCCESS, "Delete Successful");
        navigate("/");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  return (
    <>
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
            alt="Book Cover"
          />
        </CardActionArea>

        <CardContent>
          <LeftBox>
            <Typography gutterBottom variant="h5" component="div">
              Rating :{" "}
              <Rating
                name="half-rating"
                value={book?.rating}
                precision={0.5}
                readOnly
              />
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
          {userContext?.userDetails.role !== Role.ADMIN ? (
            <CentreBox>
              <Box sx={{ display: "flex", gap: 5 }}>
                <Button onClick={addReview}>Add Review</Button>
                <Button
                  onClick={() => {
                    shoppingCartContext?.updateCart(CartActions.ADD, book!);
                  }}
                  endIcon={<AddShoppingCartIcon />}
                >
                  Add To Cart
                </Button>
              </Box>
            </CentreBox>
          ) : (
            <CentreBox>
              <Box sx={{ display: "flex", gap: 5 }}>
                <Button onClick={() => setEditFlag(true)}>Edit</Button>
                <Button
                  onClick={() => {
                    setOpenFlag(true);
                  }}
                >
                  Delete
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
      {editFlag && (
        <DetailsModal
          setFlag={setEditFlag}
          bookData={book as BookDetails}
          modalUse={ModalUse.EDIT}
        />
      )}
      <DeleteConfirmation
        openFlag={openFlag}
        setOpenFlag={setOpenFlag}
        id={(book as BookDetails).bookId}
        ExecutionFunction={deleteBook}
      />
    </>
  );
}
