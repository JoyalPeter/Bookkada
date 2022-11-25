import React, { useContext, useEffect } from "react";
import { FC, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Rating, Typography } from "@mui/material";
import CentreBox from "../../UI/CenterBox";
import { Method } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import Spinner from "../../UI/Spinner";
import { useParams } from "react-router-dom";
import { UserContext } from "../../store/User_Context";
import { ViewResponseContext } from "../../store/Review_Context";

interface IAppProps {}

export interface UserInterface {
  name: string;
}

export interface ReviewDetails {
  description: string;
  rating: number;
  user: UserInterface;
}

export default function ViewReview(props: IAppProps) {
  const reviewDetails = useContext(ViewResponseContext);
  const { makeApiCall, loadingFlag } = useApiService();
  const { id } = useParams();
  useEffect(() => {
    makeApiCall(Method.GET, `ratings/getReview/${id}`)
      .then((response: ReviewDetails[]) => {
        reviewDetails?.setViewResponse(response);
        console.log(reviewDetails?.viewResponse);
      })
      .catch((error: any) => error);
  }, []);
  return (
    <div>
      {loadingFlag ? (
        <Spinner />
      ) : (
        reviewDetails?.viewResponse.map(
          (item: ReviewDetails, index: number) => (
            <Card
              key={index}
              sx={{
                width: 1,
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <CentreBox>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {item.user.name}
                  </Typography>
                </CardContent>
              </CentreBox>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {item.description}
                </Typography>
              </CardContent>
              <CardContent>
                <CentreBox>
                  <Typography gutterBottom variant="h5" component="div">
                    Rating :{" "}
                    <Rating
                      name="half-rating"
                      defaultValue={item.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Typography>
                </CentreBox>
              </CardContent>
            </Card>
          )
        )
      )}
    </div>
  );
}
