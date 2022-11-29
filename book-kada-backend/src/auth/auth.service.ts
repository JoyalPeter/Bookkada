import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import NoUserException from "src/exceptions/nouser.exception";
import PasswordExceptionError from "src/exceptions/passwordmatch.exception";
import { UsersService } from "src/resources/users/users.service";
import { JWTPayload } from "./jwt.payload";
import * as dotenv from "dotenv";
import { Roles } from "src/utils/enums";

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    if (
      email === process.env.SUPER_ADMIN_EMAIL &&
      pass === process.env.SUPER_ADMIN_PASSWORD
    ) {
      return true;
    } else {
      const user = await this.usersService.getUserByEmail(email);
      if (!user) throw new NoUserException();
      let isValidated: boolean = await user.validatePassword(pass);
      if (!isValidated) throw new PasswordExceptionError();
      return isValidated;
    }
  }
  async generateAccessToken(email: string) {
    let payload: JWTPayload;
    if (email === process.env.SUPER_ADMIN_EMAIL)
      payload = {
        userId: -2,
        role: Roles.ADMIN,
        name: "Admin",
      };
    else {
      const user = await this.usersService.getUserByEmail(email);
      payload = {
        userId: user.userId,
        role: user.role,
        name: user.name,
      };
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
