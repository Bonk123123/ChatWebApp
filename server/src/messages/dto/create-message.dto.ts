import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumberString()
  @IsNotEmpty()
  chatId: string;

  @IsNumberString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  message: string;
}
