import { useContext, useEffect } from "react";
import { useState } from "react";
import Padding from "../../UI/Padding";
import { Grid } from "@mui/material";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import Spinner from "../../UI/Spinner";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import { UserContext } from "../../store/User_Context";

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
  const userDetails = useContext(UserContext);
  const [data, setData] = useState([] as BookDataProps[]);
  console.log(userDetails);
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
              <Cards
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
