import { Injectable } from '@nestjs/common';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Background, BackgroundDocument } from './entities/background.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BackgroundsService {
  constructor(
    @InjectModel(Background.name)
    private backgroundModel: Model<BackgroundDocument>,
    private configService: ConfigService,
  ) {}

  async create(
    createBackgroundDto: CreateBackgroundDto,
    img: Express.Multer.File,
  ) {
    const background = new this.backgroundModel({
      img: img.path,
      user: new mongoose.Types.ObjectId(createBackgroundDto.userId),
    });

    return await background.save();
  }

  async findUsersBackgrounds(userId: string) {
    const bg = await this.backgroundModel.find({
      user: new mongoose.Types.ObjectId(userId),
    });

    const url = `http://${this.configService.get(
      'HOST',
    )}:${this.configService.get('PORT')}/defaultBackgrounds/`;

    const onlyImages = bg
      .map((bg) => ({ img: bg.img }))
      .concat([
        { img: `${url}05b55235cbef2d98fd7b175efa9d8159.gif` },
        { img: `${url}pixel-art-snow.gif` },
        { img: `${url}pixel-art-winter.gif` },
        {
          img: `${url}gallery_picture-fc198e08-c3ea-4c65-b83a-33a0a8bb5ec5.jpg`,
        },
      ]);

    return onlyImages;
  }

  remove(id: string) {
    return `This action removes a #${id} background`;
  }
}
