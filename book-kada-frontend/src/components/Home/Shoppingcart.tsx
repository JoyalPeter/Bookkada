import Padding from "../../UI/Padding";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";

export default function Cart() {
  const [isActive, setisActive] = useState(false);
  const [tooltip, setTooltip] = useState("Add to Cart");
  const Shoppingcart = useContext(ShoppingCartContext);
  return (
    <Padding>
      <Tooltip title={tooltip}>
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
