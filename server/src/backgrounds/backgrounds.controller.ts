import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BackgroundsService } from './backgrounds.service';
import { CreateBackgroundDto } from './dto/create-background.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from 'src/utils/filesUtils/editFileName';
import { imageFileFilter } from 'src/utils/filesUtils/imageFileFilter';

@Controller('backgrounds')
export class BackgroundsController {
  constructor(private readonly backgroundsService: BackgroundsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    FileInterceptor('background', {
      storage: diskStorage({
        destination: './src/static/usersBackgrounds',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  async create(
    @Body() createBackgroundDto: CreateBackgroundDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.backgroundsService.create(createBackgroundDto, file);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':userId')
  async findUsersBackgrounds(@Param('userId') userId: string) {
    return await this.backgroundsService.findUsersBackgrounds(userId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backgroundsService.remove(id);
  }
}
