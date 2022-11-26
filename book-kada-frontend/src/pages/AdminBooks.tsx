import {  Card, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItems from "../components/Admin/ListItems";
import { Method, Toast } from "../constants/Enums";
import { BookData } from "../constants/Interfaces";
import useApiService from "../hooks/UseApiService";
import AppBar from "../UI/AppBar/AppBar";
import Padding from "../UI/Padding";
import Spinner from "../UI/Spinner";
import showToast from "../utils/Toastify";

export default function AdminBooks() {
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [data, setData] = useState([] as BookData[]);

  useEffect(() => {
    makeApiCall(Method.GET, "books/viewAllBooks")
      .then((response: BookData[]) => {
        console.log(response);
        setData(response);
        console.log(data);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }, []);

  return (
    <>
      <AppBar setData={setData} /> // to be removed
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
          {loadingFlag ? (
            <Spinner />
          ) : (
            data.map(
              (element: BookData): JSX.Element => (
                <ListItems bookData={element} setData={setData} />
              )
            )
          )}
        </Grid>
      </Padding>
    </>
  );
}
