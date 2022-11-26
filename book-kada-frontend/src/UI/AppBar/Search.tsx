import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import useApiService from "../../hooks/UseApiService";
import { Method, Toast } from "../../constants/Enums";
import showToast from "../../utils/Toastify";
import { Autocomplete, TextField } from "@mui/material";
import { BookDataProps } from "../../components/Home/HomeComponent";

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
  const { makeApiCall, loadingFlag } = useApiService();
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([] as BookDataProps[]);

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
          setData(response);
        })
        .catch((error: string) => showToast(Toast.ERROR, error));
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
    // <Autocomplete
    //   disableClearable
    //   sx={{ width: 200 }}
    //   options={data.map((option) => option.name)}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       label="Search"
    //       InputProps={{
    //         ...params.InputProps,
    //         type: "search",
    //       }}
    //     />
    //   )}
    // />
  );
}
