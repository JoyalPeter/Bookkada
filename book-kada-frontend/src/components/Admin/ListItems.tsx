import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, CardContent } from "@mui/material";
import { Method, Toast } from "../../constants/Enums";
import { BookData } from "../../constants/Interfaces";
import useApiService from "../../hooks/UseApiService";
import showToast from "../../utils/Toastify";

export interface ListItemsProps {
  index: number;
  bookData: BookData;
  setData: Function;
}

export default function ListItems(props: ListItemsProps) {
  const { makeApiCall, loadingFlag } = useApiService();
  const navigate = useNavigate();
  function edit(id: number) {
    const body = {};
    makeApiCall(Method.PATCH, `books/updateBook/${id}`, body)
      .then((response: BookData[]) => {
        props.setData(response);
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }

  function deleteBook(id: number) {
    makeApiCall(Method.DELETE, `books/deleteBook/${id}`)
      .then((response: BookData[]) => {
        props.setData(response);
      })
      .catch((error: string) => showToast(Toast.ERROR, error));
  }
  return (
    <Card>
      <CardContent>
        <h1>
          {props.index + 1}. {props.bookData.name} {props.bookData.author}
          <Button>Edit</Button>
          <Button onClick={() => deleteBook(props.bookData.bookId)}>
            Delete
          </Button>
        </h1>
      </CardContent>
    </Card>
  );
}
