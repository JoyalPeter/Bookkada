import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useState } from "react";
import { BookData } from "../../constants/Interfaces";
import showToast from "../../utils/Toastify";
import { Method, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IEditModal {
  setEditFlag: Function;
  bookData: BookData;
  setData: Function;
}

export default function EditModal(props: IEditModal) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(props.bookData.name);
  const [author, setAuthor] = useState(props.bookData.author);
  const [price, setPrice] = useState(props.bookData.price);
  const [description, setDescription] = useState(props.bookData.description);
  const { makeApiCall, loadingFlag } = useApiService();

  const handleClose = () => {
    setOpen(false);
    props.setEditFlag(false);
  };

  function edit(id: number) {
    const body = {
      name: name,
      price: price,
      author: author,
      description: description,
    };
    makeApiCall(Method.PATCH, `books/updateBook/${id}`, body)
      .then((response: BookData[]) => {
        props.setData(response);
        props.setEditFlag(false);
        showToast(Toast.SUCCESS, "Edit Successful");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon onClick={handleClose} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box>
              Name :
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              Author :
              <TextField
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Box>
            <Box>
              Price :
              <TextField
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Box>
            <Box>
              Discription :
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              onClick={() => edit(props.bookData.bookId)}
            >
              Submit
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
