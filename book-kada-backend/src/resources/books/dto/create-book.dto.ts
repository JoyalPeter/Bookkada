import { errorMessages } from "src/utils/enums";
import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  name: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  price: number;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  description: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  author: string;

  rating: number
}
