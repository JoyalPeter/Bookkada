import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalysticsDialog from "../components/Admin/Analytics";
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
  ratingId:number;
  description: string;
  rating: number;
  user: UserInterface;
  book: BookDataProps;
}

interface Counts {
  userCount: number;
  bookCount: number;
  orderCount: number;
  reviewCount: number;
}

export default function AdminPage() {

  const [counts, setCounts] = useState({
    bookCount: 0,
    userCount: 0,
    reviewCount: 0,
    ordersCount:0,
  });
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [open, setOpen] = useState(false);
  const [userContent, setUserContent] = useState([] as userDetailsProps[]);
  const [orderContent, setOrderContent] = useState([] as Order[]);
  const [reviewContent, setReviewContent] = useState([] as IReviews[]);

  useEffect(() => {
    makeApiCall(Method.GET, "analytics/counts") 
      .then((response: Counts) => {
        setCounts({
          bookCount: response.bookCount,
          userCount: response.userCount,
          reviewCount: response.reviewCount,
          ordersCount: response.orderCount,
        });
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }, []);

  async function getUsers() {
    makeApiCall(Method.GET, "users")
      .then((response: userDetailsProps[]) => {
        setUserContent(response);
        setOrderContent([]);
        setReviewContent([]);
        setOpen(true);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }

  async function getOrders() {
    makeApiCall(Method.GET, "orders/getAllOrders")
      .then((response: Order[]) => {
        setOrderContent(response);
        setUserContent([]);
        setReviewContent([]);
        setOpen(true);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }

  async function getReviews() {
    makeApiCall(Method.GET, "ratings/getAllRatings")
      .then((response: IReviews[]) => {
        setReviewContent(response);
        setUserContent([]);
        setOrderContent([]);
        setOpen(true);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }
  console.log(reviewContent);

  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <LoadedComponent loadingFlag={loadingFlag}>
        <Stack direction="row" spacing={2} padding={2}>
          <Card
            sx={{ width: "25%" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <CardContent>
              <h1>{counts.bookCount}</h1> Books
            </CardContent>
          </Card>

          <Card
            sx={{ width: "25%"}}
            onClick={() => {
              getOrders();
            }}
          >
            <CardContent>
              <h1>{counts.ordersCount}</h1>Orders
            </CardContent>
          </Card>

          <Card
            sx={{ width: "25%" }}
            onClick={() => {
              getReviews();
            }}
          >
            <CardContent>
              <h1>{counts.reviewCount}</h1>reviews
            </CardContent>
          </Card>

          <Card
            sx={{ width: "25%"}}
            onClick={() => {
              getUsers();
            }}
          >
            <CardContent>
              <h1>{counts.userCount}</h1>Users
            </CardContent>
          </Card>
        </Stack>
      </LoadedComponent>
      <AnalysticsDialog
        open={open}
        setOpen={setOpen}
        users={userContent}
        orders={orderContent}
        reviews={reviewContent}
      ></AnalysticsDialog>
    </>
  );
}
