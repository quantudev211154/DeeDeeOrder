import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRootUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
