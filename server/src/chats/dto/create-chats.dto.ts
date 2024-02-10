import { IsString } from 'class-validator';

export class CreateChatsDto {
  @IsString()
  name?: string;

  img?: Express.Multer.File;

  usersId: string | string[];
}
