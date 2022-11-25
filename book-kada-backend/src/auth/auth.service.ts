import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import NoUserException from "src/exceptions/nouser.exception";
import PasswordExceptionError from "src/exceptions/passwordmatch.exception";
import { UsersService } from "src/resources/users/users.service";
import { JWTPayload } from "./jwt.payload";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new NoUserException();
    let isValidated: boolean = await user.validatePassword(pass);
    if (!isValidated) throw new PasswordExceptionError();
    return isValidated;
  }
  async generateAccessToken(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    const payload: JWTPayload = { userId: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
