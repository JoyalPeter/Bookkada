import { useEffect } from "react";
import { useState } from "react";
import Padding from "../../UI/Padding";
import { Grid } from "@mui/material";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import Spinner from "../../UI/Spinner";
import Cards from "./Cards";
export interface BookDataProps {
  bookId: number;
  name: string;
  price: number;
  description: string;
  author: string;
  rating?: number;
}

export default function UserPage() {
  const { makeApiCall, loadingFlag } = useApiService();

  const [data, setData] = useState([] as BookDataProps[]);

  useEffect(() => {
    makeApiCall(Method.GET, "books/viewAllBooks")
      .then((response: BookDataProps[]) => {
        setData(response);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }, []);

  return (
    <>
      <Padding>
        <Grid
          container
          paddingTop={1}
          alignItems="center"
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {loadingFlag && <Spinner />}
          {data.map(
            (element: BookDataProps, index: number): JSX.Element => (
              <Cards
                key={index}
                bookId={element.bookId}
                name={element.name}
                price={element.price}
                rating={element.rating}
                description={element.description}
                author={element.author}
              />
            )
          )}
        </Grid>
      </Padding>
    </>
  );
}
