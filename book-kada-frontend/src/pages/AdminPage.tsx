import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../components/Admin/Analytics";
import { Method, Toast } from "../constants/Enums";
import useApiService from "../hooks/UseApiService";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import LoadedComponent from "../UI/LoadedComponent";
import showToast from "../utils/Toastify";

export default function AdminPage() {
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    makeApiCall(Method.GET, "books/booksCount") // get no. of book
      .then((response: number) => {
        setBookCount(response);
      })
      .catch((error) => showToast(Toast.ERROR, error)); 
      
    makeApiCall(Method.GET, "users/usersCount") // get no. of users
      .then((response: number) => {
        setUserCount(response);
      })
      .catch((error) => showToast(Toast.ERROR, error));

    makeApiCall(Method.GET, "orders/ordersCount") // get no. of orders
      .then((response: number) => {
        setOrdersCount(response);
      })
      .catch((error) => showToast(Toast.ERROR, error));

    makeApiCall(Method.GET, "ratings/ratingsCount") // get no. of reviews
      .then((response: number) => {
        setReviewCount(response);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }, []);
console.log(open)
  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <LoadedComponent loadingFlag={loadingFlag}>
        <Grid
          container
          paddingTop={1}
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Card
            sx={{ width: "25%", minWidth: 275 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <CardContent>
              <h1>{bookCount}</h1> Books
            </CardContent>
          </Card>
          <Card
            sx={{ width: "25%", minWidth: 275 }}
            onClick={() => {
              navigate("/admin");
            }}
          >
            <CardContent>
              <h1>{ordersCount}</h1>Orders
            </CardContent>
          </Card>
          <Card
            sx={{ width: "25%", minWidth: 275 }}
            onClick={() => {
              navigate("/admin");
            }}
          >
            <CardContent>
              <h1>{reviewCount}</h1>reviews
            </CardContent>
          </Card>
          <Card
            sx={{ width: "25%", minWidth: 275 }}
            onClick={() => {
              setOpen(true)
            }}
          >
            <CardContent>
              <h1>{userCount}</h1>Users
            </CardContent>
          </Card>
        </Grid>
      </LoadedComponent>
      <FullScreenDialog open={open}></FullScreenDialog>
    </>
  );
}
