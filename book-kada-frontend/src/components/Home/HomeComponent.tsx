import React, { useEffect } from "react";
import { useState } from "react";
import Padding from "../../UI/Padding";
import { Grid } from "@mui/material";
import Cards from "./Cards";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/enums";
import showToast from "../../utils/Toastify";
import { useNavigate } from "react-router-dom";
import ResponsiveGrid from "../../UI/Transition";

export interface BookDataProps {
  bookId: number;
  name: string;
  price: number;
  description: string;
  author: string;
}

export default function UserPage() {
  const navigate = useNavigate();
  const { makeApiCall } = useApiService();
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
        <ResponsiveGrid />
        <Grid
          container
          rowSpacing={2}
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          {/* {data.map(
            (element: BookDataProps): JSX.Element => (
              <Cards bookId={element.bookId} name={element.name} price={element.price} description={element.description} author={element.author}/>
            )
          )} */}
        </Grid>
      </Padding>
    </>
  );
}
