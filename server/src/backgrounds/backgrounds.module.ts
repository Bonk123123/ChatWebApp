import { Module } from '@nestjs/common';
import { BackgroundsService } from './backgrounds.service';
import { BackgroundsController } from './backgrounds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Background, BackgroundSchema } from './entities/background.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Background.name, schema: BackgroundSchema },
    ]),
  ],
  controllers: [BackgroundsController],
  providers: [BackgroundsService],
})
export class BackgroundsModule {}
