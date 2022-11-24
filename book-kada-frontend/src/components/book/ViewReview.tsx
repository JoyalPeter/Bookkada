import React, { useEffect } from 'react';
import { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Rating, Typography } from '@mui/material';
import CentreBox from '../../UI/CenterBox';
import { Method } from '../../constants/Enums';
import useApiService from '../../hooks/UseApiService';
import Spinner from '../../UI/Spinner';

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
  const [viewresp, setViewResponse] = useState([] as ReviewDetails[]);
  const { makeApiCall, loadingFlag } = useApiService();
  useEffect(() => {
    makeApiCall(Method.GET, 'ratings/getReview/2')
      .then((reviewResponse: ReviewDetails[]) => {
        console.log('view review', reviewResponse);

        setViewResponse(reviewResponse);
      })
      .catch((error: any) => error);
  }, []);
  return (
    <div>
      {loadingFlag ? (
        <Spinner />
      ) : (
        viewresp.map((item: ReviewDetails, index) => (
          <Card
            sx={{
              width: 1,
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
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
                  Rating :{' '}
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
        ))
      )}
    </div>
  );
}
