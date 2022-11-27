import { errorMessages } from 'src/utils/enums';
import { IsNotEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  link: string;

  @IsNotEmpty({ message: errorMessages.mandatoryEmpty })
  bookId: number;
}
