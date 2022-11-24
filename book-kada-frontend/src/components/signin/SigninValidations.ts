import { useState } from 'react';

export default function useSigninValidate() {
    const [errorTexts, setErrorTexts] = useState({
        usernameError: "",
        passwordError: "",
    });

    const validateSignin = (username: string | null, password: string | null): boolean => {
        if (username === "" || !username) {
            setErrorTexts((errorTexts) => {
                errorTexts.usernameError = "Username cannot be empty";
                return { ...errorTexts };
            });
            return false;
        } else {
            setErrorTexts((errorTexts) => {
                errorTexts.usernameError = "";
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

