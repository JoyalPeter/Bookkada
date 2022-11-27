import { FC, useContext, useEffect } from "react";

import CentreBox from "../../UI/CenterBox";
import Padding from "../../UI/Padding";
import ViewReview from "./ViewReview";
import DetailsSubCard from "./DetailsSubCard";
import { Method } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { useParams } from "react-router-dom";
import { BookContext } from "../../store/Book_Context";
import LoadedComponent from "../../UI/LoadedComponent";

interface DetailsProps {}

export interface RatingInterface {
  description: string;
  rating: number;
}

export interface BookDetails {
  bookId: number;
  name: string;
  price: number;
  description: string;
  author: string;
  ratings: RatingInterface[];
  rating: number;
}

const DetailsCard: FC<DetailsProps> = ({}) => {
  const bookContext = useContext(BookContext);
  const { makeApiCall, loadingFlag } = useApiService();
  const { id } = useParams();
  useEffect(() => {
    makeApiCall(Method.GET, `books/getBook/${id}`)
      .then((response: BookDetails) => {
        bookContext?.setBookDetails(response);
      })
      .catch((error) => error);
  }, []);

  return (
    <>
      <Padding>
        <LoadedComponent loadingFlag={loadingFlag}>
          <DetailsSubCard book={bookContext?.bookDetails} />
          <CentreBox>
            <h1>Reviews</h1>
          </CentreBox>
          <ViewReview />
        </LoadedComponent>
      </Padding>
    </>
  );
};

export default DetailsCard;
