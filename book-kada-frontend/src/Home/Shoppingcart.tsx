import * as React from 'react';
import Padding from "../UI/Padding";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState } from 'react';
import { Tooltip, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

export default function Cart () {
const [isActive, setisActive] = useState(false);
const [tooltip, setTooltip] = useState("Add to Cart");
  return (
    <Padding>
  <Tooltip title={tooltip}>
    <IconButton>
      {!isActive ? (
        <ShoppingCartOutlinedIcon
          onClick={() => {
            setisActive(!isActive);
            {
              setTooltip("Remove from Cart");
            }
          }}
        />
      ) : (
        <ShoppingCart
          onClick={() => {
            setisActive(!isActive);
            setTooltip("Add to Cart");
          }}
        />
      )}
    </IconButton>
  </Tooltip>
</Padding>
  );
}


