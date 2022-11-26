import Padding from "../../UI/Padding";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import { Labels } from "../../constants/Labels";
import { BookDetails } from "../book/DetailsCard";
import { CartActions } from "../../constants/Enums";

export interface CartProps {
  book: BookDetails;
}

export default function Cart({ book }: CartProps) {
  const tooltip = Labels.ADD_CART_HELPER;
  const Shoppingcart = useContext(ShoppingCartContext);
  return (
    <Padding>
      <Tooltip title={tooltip}>
        <IconButton
          onClick={() => {
            Shoppingcart?.updateCart(book, CartActions.ADD);
          }}
        >
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Padding>
  );
}
