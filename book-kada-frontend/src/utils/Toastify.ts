import { toast } from "react-toastify";
import { Toast } from "../constants/enums";

const showToast = (type: Toast, message: string) => {
    let toastify = toast[type]
    toastify(message);
};

export default showToast;
