import { useState } from 'react';
import { emailRegex } from '../../constants/Regex';

export default function useSigninValidate() {
    const [errorTexts, setErrorTexts] = useState({
        emailError: "",
        passwordError: "",
    });

    const validateSignin = (email: string | null, password: string | null): boolean => {
        if (!emailRegex.test(email!) || !email) {
            setErrorTexts((errorTexts) => {
                errorTexts.emailError = "Username cannot be empty";
                return { ...errorTexts };
            });
            return false;
        } else {
            setErrorTexts((errorTexts) => {
                errorTexts.emailError = "";
                return { ...errorTexts };
            });
        }

        if (password === "" || !password) {
            setErrorTexts((errorTexts) => {
                errorTexts.passwordError = "Password cannot be empty";
                return { ...errorTexts };
            });
            return false;
        } else {
            setErrorTexts((errorTexts) => {
                errorTexts.passwordError = "";
                return { ...errorTexts };
            });
        }

        return true;
    };
    return { validateSignin, errorTexts }

}

