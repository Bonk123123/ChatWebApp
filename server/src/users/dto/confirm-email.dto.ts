import { IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  token: string;
}

export default ConfirmEmailDto;
