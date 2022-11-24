import { errorMessages } from 'src/utils/errorMessages';
import { IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  description: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  rating: number;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  userId: number;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  bookId: number;
}
