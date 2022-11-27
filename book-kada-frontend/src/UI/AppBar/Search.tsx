import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import { Autocomplete, TextField } from "@mui/material";
import { BookDataProps } from "../../components/Home/HomeComponent";
import { UserContext } from "../../store/User_Context";
import { BookContext } from "../../store/Book_Context";
import { useNavigate } from "react-router-dom";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBar() {
  const navigate = useNavigate();
  const { makeApiCall, loadingFlag } = useApiService();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([] as BookDataProps[]);
  const keys = [];
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
        sx={{width:"20%"}}
        noOptionsText="No matching search results!"
        size="small"
        handleHomeEndKeys={true}
        onChange={(event, value) => {
          const bookName = value?.split(" by")[0];
          let id;
           searchResults.forEach((e) => {
            if (e.name == bookName) {
              id = e.bookId;};
          });
          navigate(`/details/${id}`);
        }}
        options={searchResults.map((e) => e.name + " by " + e.author)}
        onInputChange={(event: object, value: string, reason: string) => {
          if (reason === "input") {
            search(value);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search" variant="outlined" />
        )}
      />
    
  );
}
