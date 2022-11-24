import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Method, Toast } from "../constants/enums";
import useApiService from "../hooks/UseApiService";
import Spinner from "../UI/Spinner";
import showToast from "../utils/Toastify";
import Padding from "../UI/Padding";
import ListItems from "../components/Admin/ListItems";

export interface BookDataProps {
  bookId: number;
  name: string;
  price: number;
  description: string;
  author: string;
}

export default function UserPage() {
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [data, setData] = useState([] as BookDataProps[]);

  useEffect(() => {
    makeApiCall(Method.GET, "books/viewAllBooks")
      .then((response: BookDataProps[]) => {
        console.log(response);
        setData(response);
        console.log(data);
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
            (element: BookDataProps): JSX.Element => (
              <ListItems
                bookId={element.bookId}
                name={element.name}
                price={element.price}
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
