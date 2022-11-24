import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../constants/enums";

export default class DBException extends HttpException {
  constructor() {
    super(Errors.DBERROR, HttpStatus.BAD_GATEWAY);
  }
}
