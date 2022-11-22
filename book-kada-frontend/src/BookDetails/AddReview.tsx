import * as React from 'react';
import { Rating, Button, TextField,Typography} from "@mui/material";
import { FC, useState } from "react";


export interface IAppProps {
    addflag:Boolean;
    setAddflag:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Review ({setAddflag,addflag}: IAppProps) {
    const [ratingvalue, setRatingValue] = useState(0);
    const [reviewdata, setReviewData] = useState('');
    function reviewSubmit(){
        setAddflag(!addflag);
      }
  return (
    <div>
      <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ display: "flex", gap: 3 }}
            >
              Review : <TextField variant="outlined" size="small" onChange={(e)=>setReviewData(e.target.value)}/>
              Rating :{" "}
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={(event, newRatingValue) => {setRatingValue(ratingvalue)}}/>
              <Button variant="contained" color="success" onClick={reviewSubmit}>
                Submit
              </Button>
            </Typography>
    </div>
  );
}
