import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import ListItems from '../components/Admin/ListItems';
import { Method, Toast } from '../constants/enums';
import { BookData } from '../constants/Interfaces';
import useApiService from '../hooks/UseApiService';
import Spinner from '../UI/Spinner';
import showToast from '../utils/Toastify';

export interface IAdminBooksProps {}

export default function AdminBooks(props: IAdminBooksProps) {
  const { makeApiCall, loadingFlag } = useApiService();
  const [data, setData] = useState([] as BookData[]);

  useEffect(() => {
    makeApiCall(Method.GET, 'books/viewAllBooks')
      .then((response: BookData[]) => {
        setData(response);
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }, []);

  return (
    <>
      {loadingFlag ? (
        <Spinner />
      ) : (
        data.map((element: BookData, index: number) => (
          <ListItems index={index} bookData={element} setData={setData} />
        ))
      )}
    </>
  );
}
