import { errorMessages } from "src/utils/errorMessages";
import { IsNotEmpty } from 'class-validator';


export class CreateOrderDto {
  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  orderDate: Date;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  bookId: number;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  userId: number;
}
