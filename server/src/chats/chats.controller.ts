import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CreateChatsDto } from './dto/create-chats.dto';
import { UpdateChatsDto } from './dto/update-chats.dto';
import { ChatsService } from './chats.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/filesUtils/editFileName';
import { imageFileFilter } from 'src/utils/filesUtils/imageFileFilter';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './src/static/avatars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  async create(
    @Body() CreateChatDto: CreateChatsDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      }),
    )
    img?: Express.Multer.File,
  ) {
    return await this.chatsService.create(CreateChatDto, img);
  }

  @Patch(':userId')
  async addChatToUser(@Param('userId') userId: string, @Body() chatId: string) {
    return await this.chatsService.addChatToUser(userId, chatId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':userId')
  async findAllUserChats(
    @Query() query: { searchParam: string; skip: number; limit: number },
    @Param('userId') userId: string,
  ) {
    return await this.chatsService.findAllUserChatsClient(
      userId,
      query.searchParam,
      query.skip,
      query.limit,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findChat(@Query() query: { chatId: string; userId: string }) {
    return await this.chatsService.findOneClient(query.chatId, query.userId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('img'))
  @Put(':chatId')
  update(
    @Param('chatId') chatId: string,
    @Body() UpdateChatDto: UpdateChatsDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      }),
    )
    img?: Express.Multer.File,
  ) {
    return this.chatsService.update(chatId, UpdateChatDto, img);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':chatId')
  remove(@Param('chatId') chatId: string) {
    return this.chatsService.remove(chatId);
  }
}
