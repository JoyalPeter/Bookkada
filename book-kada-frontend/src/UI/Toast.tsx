import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      limit={1}
      autoClose={500}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}
