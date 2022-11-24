import { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import Padding from "../../UI/Padding";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Favorites() {
  const [isActive2, setisActive2] = useState(false);
  const [favtip, setFavtip] = useState("Add to Favorites");
  return (
    <Padding>
      <Tooltip title={favtip}>
        {!isActive2 ? (
          <IconButton
            onClick={() => {
              setisActive2(!isActive2);
              {
                setFavtip("Remove from Favorites");
              }
            }}
          >
            <FavoriteBorder />
          </IconButton>
        ) : (
          <IconButton>
            <FavoriteIcon
              onClick={() => {
                setisActive2(!isActive2);
                setFavtip("Add to Favorites");
              }}
            />
          </IconButton>
        )}
      </Tooltip>
    </Padding>
  );
}
