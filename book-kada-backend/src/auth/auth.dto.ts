import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { errorMessages } from 'src/utils/enums';

export class LoginDTO {
    @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
    @IsEmail({ message: errorMessages.notEmail })
    email: string;

    @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
    @Length(8, 24, { message: errorMessages.passWordLength })
    pass: string;
}