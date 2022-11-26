import { useNavigate } from 'react-router-dom';
import useApiService from '../../hooks/UseApiService';
import { Method, Toast } from '../../constants/Enums';
import showToast from '../../utils/Toastify';
import { BookDataProps } from '../Home/HomeComponent';

const navigate = useNavigate();
const { makeApiCall, loadingFlag } = useApiService();

function edit(id: number) {
  const body = {};
  makeApiCall(Method.PATCH, `books/updateBook/${id}`, body)
    .then((response: BookDataProps[]) => {
      //   setData(response);
    })
    .catch((error: string) => showToast(Toast.ERROR, error));
}

function deleteBook(id: number) {
  makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
    .then((response: BookDataProps[]) => {
      //   setData(response);
    })
    .catch((error: string) => showToast(Toast.ERROR, error));
}
