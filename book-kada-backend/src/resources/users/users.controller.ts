import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async create(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    createUserDto: CreateUserDto
  ) {
    await this.usersService.create(createUserDto);
    return "user created successfully";
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(":id")
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  async findOne(@Param("id") id: string) {
    return await this.usersService.findOne(+id);
  }

  // @Get(":id")
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Patch("/updateUser/:id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete("/deleteUser/:id")
  async remove(@Param("id") id: string) {
    return await this.usersService.remove(+id);
  }
}
