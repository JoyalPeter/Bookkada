import { useEffect, useState } from "react";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import { Autocomplete, TextField } from "@mui/material";
import { BookDataProps } from "../../components/Home/HomeComponent";

import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([] as BookDataProps[]);
  useEffect(() => {
    const timer = setTimeout(() => {
      search(searchKey);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchKey]);

  function search(searchKey: string) {
    if (searchKey) {
      makeApiCall(Method.GET, `books/search/${searchKey}`)
        .then((response: BookDataProps[]) => {
          setSearchResults(response);
        })
        .catch((error: string) => showToast(Toast.ERROR, error));
    }
  }

  return (
    <Autocomplete
      sx={{
        width: "20%",
        margin: 2,
        backgroundColor: "#ffffff26",
        borderWidth: 0,
      }}
      noOptionsText={
        loadingFlag ? "Searching..." : "No matching search results!"
      }
      size="small"
      handleHomeEndKeys={true}
      onChange={(_, value) => {
        const bookName = value?.split(" by")[0];
        let id;
        searchResults.forEach((e) => {
          if (e.name === bookName) {
            id = e.bookId;
          }
        });
        navigate(`/details/${id}`);
      }}
      options={searchResults.map((e) => e.name + " by " + e.author)}
      onInputChange={(_, value: string, reason: string) => {
        if (reason === "input") {
          setSearchKey(value);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Books..." variant="outlined" />
      )}
    />
  );
}
