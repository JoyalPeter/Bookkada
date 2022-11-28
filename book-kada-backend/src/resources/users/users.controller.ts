import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";


@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("signup")
  async create(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    createUserDto: CreateUserDto
  ) {
    await this.usersService.create(createUserDto);
    return "user created successfully";
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get("usersCount")
  async userCount() {
    return await this.usersService.userCount();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch("/updateUser/:id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete("/deleteUser/:id")
  async remove(@Param("id") id: string) {
    return await this.usersService.remove(+id);
  }
}
