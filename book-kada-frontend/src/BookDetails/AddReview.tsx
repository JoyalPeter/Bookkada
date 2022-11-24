import * as React from 'react';
import { Rating, Button, TextField,Typography} from "@mui/material";
import { FC, useState } from "react";
import { BookDetails } from './DetailsCard';


export interface IAppProps {
  addReviewFlag: Boolean;
  setaddReviewFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Review({addReviewFlag, setaddReviewFlag }: IAppProps) {
  const [ratingvalue, setRatingValue] = useState(0);
  const [reviewdata, setReviewData] = useState("");
  function reviewSubmit() {
    setaddReviewFlag(!addReviewFlag);
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
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
          onChange={(event, newRatingValue) => {
            setRatingValue(ratingvalue);
          }}
        />
        <Button variant="contained" onClick={reviewSubmit}>
          Submit
        </Button>
      </Typography>
    </div>
  );
}
