import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ChatModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { EmailModule } from './email/email.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BackgroundsModule } from './backgrounds/backgrounds.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');

        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './static',
    }),
    UsersModule,
    AuthenticationModule,
    ChatModule,
    MessagesModule,
    EmailModule,
    BackgroundsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
