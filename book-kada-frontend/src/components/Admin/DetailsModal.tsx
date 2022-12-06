import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ModalUse } from "../../constants/Enums";
import { BookDataProps } from "../Home/HomeComponent";
import LoadedComponent from "../../UI/LoadedComponent";

import LeftBox from "../../UI/LeftBox";
import Button from "../../UI/Button";
import useAdminFunctions from "./adminFunctions";

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
  bookData?: BookDataProps;
  modalUse: ModalUse;
}

export default function DetailsModal(props: IDetailsModal) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [loadingFlag, setLoadingFlag] = useState(false);
  const { editBook, addBook } = useAdminFunctions();
  let photo: File;
  
  useEffect(() => {
    if (props.bookData) {
      setName(props.bookData.name);
      setAuthor(props.bookData.author);
      setPrice(props.bookData.price);
      setDescription(props.bookData.description);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.setFlag(false);
  };

  function edit(id: number) {
    const body = {
      name,
      price,
      author,
      description,
    };
    editBook(id, body);
    props.setFlag(false);
  }

  function add() {
    const book = {
      name: name,
      price: price,
      author: author,
      description: description,
      rating: 0,
    };
    addBook(photo, book, setLoadingFlag, props.setFlag);
  }

  const handlePhotoSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      photo = event.target.files[0];
    }
  };

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
          <Typography id="modal-modal-description" sx={{ mt: 2, px: 5 }}>
            <Box>
              Name
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              Author
              <TextField
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Box>
            <Box>
              Price
              <TextField
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Box>
            <Box>
              Description
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            {props.modalUse === ModalUse.ADD && (
              <Box>
                Add Book Cover
                <TextField
                  type={"file"}
                  inputProps={{ accept: "images/*" }}
                  onChange={handlePhotoSubmit}
                />
              </Box>
            )}
            <LoadedComponent loadingFlag={loadingFlag}>
              <LeftBox>
                <Button
                  onClick={() => {
                    if (props.bookData) {
                      edit(props.bookData.bookId);
                    } else {
                      add();
                    }
                  }}
                >
                  Submit
                </Button>
              </LeftBox>
            </LoadedComponent>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
