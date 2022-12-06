import { useContext } from "react";
import { Method, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { BookContext } from "../../store/Book_Context";
import showToast from "../../utils/Toastify";
import { BookDetails } from "../book/DetailsCard";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../image_storage/uploadConfig";
import { useNavigate } from "react-router-dom";

export default function useAdminFunctions() {
  const { makeApiCall } = useApiService();
  const navigate = useNavigate();
  const bookContext = useContext(BookContext);

  const editBook = (id: number, body: Object) => {
    makeApiCall(Method.PATCH, `books/updateBook/${id}`, body)
      .then((response: BookDetails[]) => {
        bookContext?.setAllBooks(response);
        showToast(Toast.SUCCESS, "Edit Successful");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  };

  const addBook = (
    photo: File,
    book: Object,
    setLoadingFlag: Function,
    setModalFlag: Function
  ) => {
    const storageRef = ref(storage, `Bookkada/${photo.name}`);
    const uploadImage = uploadBytesResumable(storageRef, photo);
    setLoadingFlag(true);
    uploadImage.on(
      "state_changed",
      () => {},
      () => {},
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const body = {
            ...book,
            cover: url,
          };
          makeApiCall(Method.POST, `books/addBook`, body)
            .then((response: BookDetails[]) => {
              bookContext?.setAllBooks(response);
              setLoadingFlag(false);
              setModalFlag(false);
              showToast(Toast.SUCCESS, "Added Successfully");
            })
            .catch((error: string) => showToast(Toast.ERROR, error));
        });
      }
    );
  };

  const deleteBook = (id: number) => {
    makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
      .then((response: BookDetails[]) => {
        bookContext?.setAllBooks(response);
        showToast(Toast.SUCCESS, "Delete Successful");
        navigate("/");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  };

  const deleteOrder=(id:number)=>{

    makeApiCall(Method.DELETE, `orders/${id}`)
      .then((_: BookDetails[]) => {
        showToast(Toast.SUCCESS, "Delete Successful");
        navigate("/");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  const deleteReview=(id:number)=>{

    makeApiCall(Method.DELETE, `ratings/${id}`)
      .then((_: BookDetails[]) => {
        showToast(Toast.SUCCESS, "Delete Successful");
        navigate("/");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  const deleteUser=(id:number)=>{

    makeApiCall(Method.DELETE, `users/deleteUser/${id}`)
      .then((_: BookDetails[]) => {
        showToast(Toast.SUCCESS, "Delete Successful");
        navigate("/");
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  return {
    editBook,
    addBook,
    deleteBook,
    deleteUser,
    deleteReview,
    deleteOrder,
  };
}
