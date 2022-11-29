import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import showToast from "../../utils/Toastify";
import { Method, ModalUse, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookDataProps } from "../Home/HomeComponent";
import { BookContext } from "../../store/Book_Context";
import { BookDetails } from "../book/DetailsCard";
import LoadedComponent from "../../UI/LoadedComponent";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../image_storage/uploadConfig";
import LeftBox from "../../UI/LeftBox";
import Button from "../../UI/Button";

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
  const [loadingFlag, setLoadingFlag] = useState(false);
  const { makeApiCall } = useApiService();
  let photo: File;

  const handleClose = () => {
    setOpen(false);
    props.setFlag(false);
  };

  function editBook(id: number) {
    const body = {
      name,
      price,
      author,
      description,
    };
    makeApiCall(Method.PATCH, `books/updateBook/${id}`, body)
      .then((response: BookDetails[]) => {
        bookContext?.setAllBooks(response);
        props.setFlag(false);
        showToast(Toast.SUCCESS, "Edit Successful");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  function addBook() {
    setLoadingFlag(true);
    const storageRef = ref(storage, `Bookkada/${photo.name}`);
    const uploadImage = uploadBytesResumable(storageRef, photo);

    uploadImage.on(
      "state_changed",
      () => {},
      () => {},
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const body = {
            name: name,
            price: price,
            author: author,
            description: description,
            rating: 0,
            cover: url,
          };
          makeApiCall(Method.POST, `books/addBook`, body) //API call to add book
            .then((response: BookDetails[]) => {
              bookContext?.setAllBooks(response);
              setLoadingFlag(false);
              props.setFlag(false);
              showToast(Toast.SUCCESS, "Added Successfully");
            })
            .catch((error: string) => showToast(Toast.ERROR, error));
        });
      }
    );
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
                    if (props.modalUse === ModalUse.EDIT) {
                      editBook(props.bookData.bookId);
                    } else {
                      addBook();
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
