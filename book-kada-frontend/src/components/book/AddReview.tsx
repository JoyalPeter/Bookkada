import React from "react";
import { Rating, Button, TextField, Typography } from "@mui/material";
import { ReviewDetails } from "./ViewReview";
import { useContext } from "react";
import { UserContext } from "../../store/User_Context";
import { useState } from "react";
import { BookDetails } from "./DetailsCard";
import { Method } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookContext } from "../../store/Book_Context";
import { useParams } from "react-router-dom";
import LoadedComponent from "../../UI/LoadedComponent";

export interface IAppProps {
  addReviewFlag: Boolean;
  setaddReviewFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddReviewDetails {
  description: string;
  rating: number;
  userId: number;
  bookId: number;
}

export default function Review({ addReviewFlag, setaddReviewFlag }: IAppProps) {
  const [ratingvalue, setRatingValue] = React.useState<number | null>(2);
  const [reviewdata, setReviewData] = useState("");
  const bookContext = useContext(BookContext);
  const userDetails = useContext(UserContext);
  const { makeApiCall, loadingFlag } = useApiService();
  const { id } = useParams();
  function reviewSubmit() {
    setaddReviewFlag(!addReviewFlag);

    console.log(ratingvalue);

    makeApiCall(Method.POST, "ratings/addRating", {
      description: reviewdata,
      rating: ratingvalue,
      userId: userDetails?.userDetails.userId,
      bookId: +id!,
    })
      .then((response: ReviewDetails[]) => {
        console.log("add review", response);
        bookContext?.setReviews(response);
        makeApiCall(Method.GET, `books/getBook/${id}`)
          .then((bookdetails: BookDetails) => {
            bookContext?.setBookDetails(bookdetails);
            console.log("hi");
          })
          .catch((error) => error);
      })
      .catch((error) => error);
    // console.log(addreview);
  }
  return (
    <div>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ display: "flex", gap: 3 }}
      >
        Review :{" "}
        <TextField
          variant="outlined"
          size="small"
          onChange={(e) => setReviewData(e.target.value)}
        />
        Rating :{" "}
        <Rating
          name="simple-controlled"
          defaultValue={2.5}
          precision={0.5}
          onChange={(_, newValue) => {
            setRatingValue(newValue);
          }}
        />
        <LoadedComponent loadingFlag={loadingFlag}>
          <Button variant="contained" onClick={reviewSubmit}>
            Submit
          </Button>
        </LoadedComponent>
      </Typography>
    </div>
  );
}
