import { useContext } from "react";
import { CartActions, Method, Toast } from "../../constants/Enums";
import useApiService from "../../hooks/UseApiService";
import { ShoppingCartContext } from "../../store/Shoppingcart_Context";
import { UserContext } from "../../store/User_Context";
import showToast from "../../utils/Toastify";

export interface useCheckoutCartProps {}

export default function useCheckoutCart() {
  const shoppingcart = useContext(ShoppingCartContext);
  const userContext = useContext(UserContext);
  const { makeApiCall, loadingFlag } = useApiService();

  const userId = userContext?.userDetails.userId;
  const checkoutRequestBody = shoppingcart?.cartItems.map((cartItem) => {
    return {
      userId: userId,
      bookId: cartItem.book.bookId,
      quantity: cartItem.quantity,
    };
  });
  console.log(checkoutRequestBody);
  const checkout = () => {
    if (checkoutRequestBody?.length !== 0)
      makeApiCall(Method.POST, "orders/placeOrder", checkoutRequestBody)
        .then(() => {
          showToast(Toast.SUCCESS, "Order placed successfully");
          shoppingcart?.updateCart(CartActions.EMPTY);
        })
        .catch((error) => showToast(Toast.ERROR, error));
  };
  return { checkout, loadingFlag };
}
