import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import ConfirmEmailDto from './dto/confirm-email.dto';
import { EmailService } from 'src/email/email.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/filesUtils/editFileName';
import { imageFileFilter } from 'src/utils/filesUtils/imageFileFilter';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailService.confirmEmail(email);
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    user.password = undefined;

    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findChat(
    @Query()
    query: {
      userId: string;
      searchParam: string;
      skip: number;
      limit: number;
    },
  ) {
    return await this.usersService.findUsersForClient(
      query.userId,
      query.searchParam,
      query.skip,
      query.limit,
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('chats/:chatId')
  async findChats(@Param('chatId') chatId: string) {
    return await this.usersService.findChats(chatId);
  }

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
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    console.log(updateUserDto, file)
    const user = await this.usersService.update(id, updateUserDto, file);
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
