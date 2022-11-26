import { Card, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItems from "../components/Admin/ListItems";
import { BookDataProps } from "../components/Home/HomeComponent";
import { Method, Toast } from "../constants/Enums";
import useApiService from "../hooks/UseApiService";
import AppBar from "../UI/AppBar/AppBar";
import Padding from "../UI/Padding";
import Spinner from "../UI/Spinner";
import showToast from "../utils/Toastify";

export default function AdminBooks() {
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
      <AppBar />
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
              (element: BookDataProps): JSX.Element => (
                <ListItems bookData={element} setData={setData} />
              )
            )
          )}
        </Grid>
      </Padding>
    </>
  );
}
