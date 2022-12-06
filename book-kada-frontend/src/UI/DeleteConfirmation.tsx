import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IConfirmationBox {
  openFlag: boolean;
  setOpenFlag: Function;
  id: number;
  ExecutionFunction:Function
}

export default function DeleteConfirmation(props: IConfirmationBox) {

  const [choice, setChoice] = useState(false);


  useEffect(() => {  
    if (choice) {
      props.ExecutionFunction(props.id);
    }
  }, [choice]);

  const handleClose = () => {
    props.setOpenFlag(false);
  };

  return (
    <div>
      <Dialog
        open={props.openFlag}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Deletion?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deleted data will be lost. Confirm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setChoice(true);
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setChoice(false);
              handleClose();
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
