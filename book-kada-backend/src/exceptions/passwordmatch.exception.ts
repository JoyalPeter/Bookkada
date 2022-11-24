import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../constants/enums";

export default class PasswordExceptionError extends HttpException {
    constructor() {
        super(Errors.PASSWORDERROR, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
