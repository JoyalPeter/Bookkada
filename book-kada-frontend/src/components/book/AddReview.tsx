import * as React from "react";
import { Rating, Button, TextField, Typography } from "@mui/material";
import {  useState } from "react";

import showToast from "../../utils/Toastify";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from '../../constants/Enums';

export interface IAppProps {
  addReviewFlag: Boolean;
  setaddReviewFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ReviewDetails{
  description:string;
  rating:number;
  userId:number;
  bookId:number;
}

export default function Review({ addReviewFlag, setaddReviewFlag }: IAppProps) {
  const [ratingvalue, setRatingValue] = React.useState<number | null>(2);
  const [reviewdata, setReviewData] = useState("");
  const [addreview, setAddReview] = useState([] as ReviewDetails[]);
  const { makeApiCall, loadingFlag } = useApiService();
  function reviewSubmit() {
    setaddReviewFlag(!addReviewFlag);
    
    console.log(ratingvalue);

      makeApiCall(Method.POST, "ratings/addRating", {description:reviewdata,rating:ratingvalue,userId:1,bookId:2})
        .then((addreview: ReviewDetails[]) => {
          console.log("add review", addreview);

          setAddReview(addreview);
        })
        .catch((error: string) => showToast(Toast.ERROR, error))
    

    console.log(addreview);
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
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
        />
        <Button variant="contained" onClick={reviewSubmit}>
          Submit
        </Button>
      </Typography>
    </div>
  );
}
