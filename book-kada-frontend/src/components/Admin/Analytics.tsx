import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { userDetailsProps } from "../../store/User_Context";
import { Order } from "../orders/OrderCard";
import { IReviews } from "../../pages/AdminPage";
import { Button } from "@mui/material";
import DeleteConfirmation from "../../UI/DeleteConfirmation";
import useAdminFunctions from "./adminFunctions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IAnalysticsDialog {
  open: boolean;
  setOpen: Function;
  users: userDetailsProps[];
  orders: Order[];
  reviews: IReviews[];
}

export default function AnalysticsDialog(props: IAnalysticsDialog) {
  const [openFlag, setOpenFlag] = useState(false);
  const [executionFunction, setExecutionFunction] = useState(Function);
  const [id, setId] = useState(0);
  const { deleteUser,deleteReview,deleteOrder } = useAdminFunctions();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          {props.users?.map((user) => (
            <>
              <ListItem>
                <ListItemText primary={user.name} secondary={user.role} />
                <Button
                  onClick={() => {
                    setId(user.userId);
                    setExecutionFunction(() => deleteUser);
                    setOpenFlag(true);
                  }}
                >
                  Revoke Account
                </Button>
              </ListItem>
              <Divider />
            </>
          ))}
          {props.orders?.map((order) => (
            <>
              <ListItem>
                <ListItemText
                  primary={order.book.name}
                  secondary={`Quantity : ${order.quantity}`}
                />
                <Button
                  onClick={() => {
                    setId(order.orderId);
                    setExecutionFunction(() => deleteOrder);
                    setOpenFlag(true);
                  }}
                >
                  Cancel 
                </Button>
              </ListItem>
              <Divider />
            </>
          ))}
          {props.reviews?.map((review) => (
            <>
              <ListItem>
                <ListItemText
                  primary={`${review.book.name} - ${review.rating} Stars`}
                  secondary={`${review.user.name} - "${review.description}"`}
                />
                <Button onClick={() => {
                    setId(review.ratingId);
                    setExecutionFunction(() => deleteReview);
                    setOpenFlag(true);
                  }}>Remove</Button>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <DeleteConfirmation
          openFlag={openFlag}
          setOpenFlag={setOpenFlag}
          id={id}
          ExecutionFunction={executionFunction}
        />
      </Dialog>
    </div>
  );
}
