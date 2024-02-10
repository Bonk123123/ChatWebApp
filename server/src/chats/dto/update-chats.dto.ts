import { PartialType } from '@nestjs/mapped-types';
import { CreateChatsDto } from './create-chats.dto';

export class UpdateChatsDto extends PartialType(CreateChatsDto) {}
