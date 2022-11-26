import Padding from "../../UI/Padding";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";

export default function Cart() {
  const Shoppingcart = useContext(ShoppingCartContext);
  return (
    <Padding>
      <Tooltip title="Add to Cart">
        <IconButton
          onClick={() => {
            Shoppingcart?.setCartItems((noOfItems) => noOfItems + 1);
            console.log(Shoppingcart?.cartItems);
          }}
        >
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Padding>
  );
}
