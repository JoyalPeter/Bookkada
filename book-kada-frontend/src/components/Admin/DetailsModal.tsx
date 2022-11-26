import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { FormGroup, TextField } from "@mui/material";
import { useContext, useState } from "react";
import showToast from "../../utils/Toastify";
import { Method, ModalUse, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookDataProps } from "../Home/HomeComponent";
import { BookContext } from "../../store/Book_Context";

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

interface IDetailsModal {
  setFlag: Function;
  bookData: BookDataProps;
  modalUse: string;
}

export default function DetailsModal(props: IDetailsModal) {
  const bookContext = useContext(BookContext);
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(props.bookData.name);
  const [author, setAuthor] = useState(props.bookData.author);
  const [price, setPrice] = useState(props.bookData.price);
  const [description, setDescription] = useState(props.bookData.description);
  const { makeApiCall, loadingFlag } = useApiService();

  const handleClose = () => {
    setOpen(false);
    props.setFlag(false);
  };

  function editBook(id: number) {
    const body = {
      name: name,
      price: price,
      author: author,
      description: description,
    };
    makeApiCall(Method.PATCH, `books/updateBook/${id}`, body)
      .then((response: BookDataProps[]) => {
        bookContext?.setAllBooks(response);
        props.setFlag(false);
        showToast(Toast.SUCCESS, "Edit Successful");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  function addBook() {
    const body = {
      name: name,
      price: price,
      author: author,
      description: description,
      rating:0
    };
    makeApiCall(Method.POST, `books/addBook`, body)
      .then((response: BookDataProps[]) => {
        bookContext?.setAllBooks(response);
        props.setFlag(false);
        showToast(Toast.SUCCESS, "Added Successfully");
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
              Enter Details
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
                onClick={() => {
                  if (props.modalUse === ModalUse.EDIT) {
                    editBook(props.bookData.bookId);
                  } else {
                    addBook();
                  }
                }}
              >
                Submit
              </Button>
            </Typography>
        
        </Box>
      </Modal>
    </>
  );
}
