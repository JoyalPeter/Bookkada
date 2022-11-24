import { errorMessages } from 'src/utils/errorMessages';
import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  link: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  bookId: number;
}
