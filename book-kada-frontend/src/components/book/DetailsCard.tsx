import { FC, useEffect, useState } from "react";

import CentreBox from "../../UI/CenterBox";
import Padding from "../../UI/Padding";
import ViewReview from "./ViewReview";
import DetailsSubCard from "./DetailsSubCard";
import { Method } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import Spinner from "../../UI/Spinner";
import { useParams } from "react-router-dom";

interface DetailsProps {}

export interface RatingInterface {
  description: string;
  rating: number;
}

export interface BookDetails {
  name: string;
  price: string;
  description: string;
  author: string;
  ratings: RatingInterface[];
}

const DetailsCard: FC<DetailsProps> = ({}) => {
  const [resp, setResponse] = useState<BookDetails | null>(null);
  const { makeApiCall, loadingFlag } = useApiService();
  const { id } = useParams();
  useEffect(() => {
    makeApiCall(Method.GET, `books/getBook/${id}`)
      .then((response: BookDetails) => {
        console.log("details", response);

        setResponse(response);
      })
      .catch((error) => error);
  }, []);
  console.log(loadingFlag);

  return (
    <>
      <Padding>
        {loadingFlag ? (
          <Spinner />
        ) : (
          <>
            <DetailsSubCard resp={resp} />
            <CentreBox>
              <h1>Reviews</h1>
            </CentreBox>
            <ViewReview />
          </>
        )}
      </Padding>
    </>
  );
};

export default DetailsCard;
