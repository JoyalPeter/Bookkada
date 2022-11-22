export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: number; //enum can be used as type
  
}
