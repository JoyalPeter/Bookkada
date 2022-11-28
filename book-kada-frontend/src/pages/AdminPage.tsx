import {  Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenDialog from "../components/Admin/Analytics";
import { UserInterface } from "../components/book/ViewReview";
import { BookDataProps } from "../components/Home/HomeComponent";
import { Order } from "../components/orders/OrderCard";
import { Method, Toast } from "../constants/Enums";
import useApiService from "../hooks/UseApiService";
import { userDetailsProps } from "../store/User_Context";
import PrimarySearchAppBar from "../UI/AppBar/AppBar";
import LoadedComponent from "../UI/LoadedComponent";
import showToast from "../utils/Toastify";

export interface IReviews {
  description: string;
  rating: number;
  user: UserInterface;
  book: BookDataProps;
}

export default function AdminPage() {
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [open, setOpen] = useState(false);
  const [userContent, setUserContent] = useState([] as userDetailsProps[]);
  const [orderContent, setOrderContent] = useState([] as Order[]);
  const [reviewContent, setReviewContent] = useState([] as IReviews[]);

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

  async function getUsers() {
    makeApiCall(Method.GET, "users")
      .then((response: userDetailsProps[]) => {
        setUserContent(response);
        setOrderContent([] )
        setReviewContent([] )
        setOpen(true);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }

  async function getOrders() {
    makeApiCall(Method.GET, "orders/getAllOrders")
      .then((response: Order[]) => {
        setOrderContent(response);
        setUserContent([])
        setReviewContent([])
        setOpen(true);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }

  async function getReviews() {
    makeApiCall(Method.GET, "ratings/getAllRatings")
      .then((response: IReviews[]) => {
        setReviewContent(response);
        setUserContent([])
        setOrderContent([])
        setOpen(true);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }

  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <LoadedComponent loadingFlag={loadingFlag}>
        <Stack 
        direction="row"
        spacing={2}
        padding={2}
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
              getOrders();
            }}
          >
            <CardContent>
              <h1>{ordersCount}</h1>Orders
            </CardContent>
          </Card>

          <Card
            sx={{ width: "25%", minWidth: 275 }}
            onClick={() => {
              getReviews();
            }}
          >
            <CardContent>
              <h1>{reviewCount}</h1>reviews
            </CardContent>
          </Card>

          <Card
            sx={{ width: "25%", minWidth: 275 }}
            onClick={() => {
              getUsers();
            }}
          >
            <CardContent>
              <h1>{userCount}</h1>Users
            </CardContent>
          </Card>
        </Stack>
      </LoadedComponent>
      <FullScreenDialog
        open={open}
        setOpen={setOpen}
        users={userContent}
        orders={orderContent}
        reviews={reviewContent}
      ></FullScreenDialog>
    </>
  );
}
