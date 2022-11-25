import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./auth.dto";
@Controller("signin")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const { email, pass } = loginDTO;
    const valid = await this.authService.validateUser(email, pass);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(email);
  }
}
