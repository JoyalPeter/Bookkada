import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { errorMessages, Roles } from 'src/utils/enums';

export class CreateUserDto {

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  name: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  @IsEmail({ message: errorMessages.notEmail })
  email: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  @Length(8, 24, { message: errorMessages.passWordLength })
  password: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  role: Roles; //enum can be used as type
}
