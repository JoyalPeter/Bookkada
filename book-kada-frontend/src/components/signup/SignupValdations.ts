import { useState } from 'react';
import { emailRegex } from '../../constants/regex';

export default function useSignupValidate() {
    const [errorTexts, setErrorTexts] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
    });

    const validateSignup = (username: string | null, email: string | null,
        password: string | null): boolean => {
        if (username === "" || !username) {
            setErrorTexts((errorTexts) => {
                errorTexts.nameError = "Username cannot be empty";
                return { ...errorTexts };
            });
            return false;
        } else {
            setErrorTexts((errorTexts) => {
                errorTexts.nameError = "";
                return { ...errorTexts };
            });
        }

        if (emailRegex.test(email!) || !email) {
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
    return { validateSignup, errorTexts }

}

