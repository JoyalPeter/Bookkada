import { errorMessages } from "src/utils/enums";
import { IsNotEmpty } from 'class-validator';


export class CreateOrderDto {
  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  bookId: number;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  userId: number;

  quantity: number;
}
