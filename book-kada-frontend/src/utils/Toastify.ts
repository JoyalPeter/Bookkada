import { toast } from "react-toastify";
import { Toast } from "../constants/Enums";

const showToast = (type: Toast, message: string) => {
    let toastify = toast[type]
    toastify(message);
};

export default showToast;
