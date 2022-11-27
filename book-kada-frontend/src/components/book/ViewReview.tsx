import { useContext, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Rating, Typography } from "@mui/material";
import CentreBox from "../../UI/CenterBox";
import { Method } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { useParams } from "react-router-dom";
import { BookContext } from "../../store/Book_Context";
import LoadedComponent from "../../UI/LoadedComponent";

export interface UserInterface {
  name: string;
}

export interface ReviewDetails {
  description: string;
  rating: number;
  user: UserInterface;
}

export default function ViewReview() {
  const bookContext = useContext(BookContext);
  const { makeApiCall, loadingFlag } = useApiService();
  const { id } = useParams();
  useEffect(() => {
    makeApiCall(Method.GET, `ratings/getReview/${id}`)
      .then((response: ReviewDetails[]) => {
        bookContext?.setReviews(response);
      })
      .catch((error: any) => error);
  }, []);
  return (
    <LoadedComponent loadingFlag={loadingFlag}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {bookContext?.reviews.map((item: ReviewDetails, index: number) => (
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
        ))}
      </Box>
    </LoadedComponent>
  );
}
