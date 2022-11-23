import classes from "./Spinner.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import CenterBox from "./CenterBox";

function Spinner() {
  return (
    <CenterBox>
      <CircularProgress />
    </CenterBox>
  );
}

export default Spinner;
