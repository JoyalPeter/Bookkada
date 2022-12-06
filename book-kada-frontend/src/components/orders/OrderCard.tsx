import {
  CardActionArea,
  Typography,
  CardMedia,
  ListItem,
  ListItemText,
  CardContent,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Method, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { UserContext } from "../../store/User_Context";
import LoadedComponent from "../../UI/LoadedComponent";
import showToast from "../../utils/Toastify";
import { BookDetails } from "../book/DetailsCard";

export interface Order {
  orderId:number
  orderDate: string;
  quantity: number;
  book: BookDetails;
}

export default function OrderCard() {
  const { makeApiCall, loadingFlag } = useApiService();
  const userContext = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    makeApiCall(
      Method.GET,
      `orders/userOrders/${userContext?.userDetails.userId}`
    )
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => showToast(Toast.ERROR, error));
  }, []);

  return (
    <LoadedComponent loadingFlag={loadingFlag}>
      {orders.map(
        (order: Order): JSX.Element => (
          <Card
            sx={{
              width: 1,
              display: "grid",
              gap: 1,
              height: 200,
              margin: 2,
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                width="150"
                image={order.book.cover}
                alt="green iguana"
              />
            </CardActionArea>
            <Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {order.book.name}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  By {order.book.author}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  ${order.book.price}
                </Typography>
              </CardContent>
            </Box>
            <Box>
              <ListItem>
                <ListItemText primary="Quantity" secondary={order.quantity} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Rate" secondary={order.book.price} />
              </ListItem>
            </Box>
            <Box>
              <ListItem>
                <ListItemText
                  primary="Ordered On"
                  secondary={new Date(order.orderDate).toDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Order Amount"
                  secondary={order.book.price * order.quantity}
                />
              </ListItem>
            </Box>
          </Card>
        )
      )}
    </LoadedComponent>
  );
}
