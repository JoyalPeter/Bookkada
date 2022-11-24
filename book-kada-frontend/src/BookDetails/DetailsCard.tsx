import { FC, useEffect, useState } from "react";


import CentreBox from "../UI/CenterBox";
import Padding from "../UI/Padding";
import ViewReview from "../BookDetails/ViewReview";
import DetailsSubCard from './DetailsSubCard'
import { Method } from "../constants/enums";
import useApiService from "../hooks/UseApiService";
import Spinner from "../UI/Spinner";

interface DetailsProps {}

export interface RatingInterface{
  description:string;
  rating:number
}

export interface BookDetails {
  name: string;
  price: string;
  description: string;
  author: string;
  ratings: RatingInterface[];
}

const DetailsCard: FC<DetailsProps> = ({}) => {
  const [resp, setResponse] = useState([] as BookDetails[]);
  const { makeApiCall, loadingFlag } = useApiService();

  useEffect(() => {
    makeApiCall(Method.GET, "books/getBook/2")
      .then((response: BookDetails[]) => {
        console.log("details card", response);

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
      ) :(<><DetailsSubCard resp={resp}/><CentreBox>
            <h1>Reviews</h1>
          </CentreBox><ViewReview /></>)
      }
    </Padding>
    </>
  );
};

export default DetailsCard;
