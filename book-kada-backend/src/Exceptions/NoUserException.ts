import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../constants/enums";

export default class NoUserException extends HttpException {
    constructor() {
        super(Errors.NOUSERROR, HttpStatus.NOT_FOUND);
    }
}
