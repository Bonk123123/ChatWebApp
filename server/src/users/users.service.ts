import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('Users Service');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => EmailService))
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExisting = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (userExisting)
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      img: '',
      chats: [],
    });

    const user = await createdUser.save();

    this.emailService.sendVerificationLink(user.email);

    this.logger.log('new user', user.username);

    user.password = undefined;

    return user;
  }

  async confirmEmailForUser(id: string) {
    await this.userModel.findByIdAndUpdate(id, { isEmailConfirmed: true });
  }

  async findAll() {
    return await this.userModel.find({}, { password: 0 }).exec();
  }

  async findChats(userId: string) {
    return (await this.userModel.findById(userId)).chats;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findById(ids: string[] | string) {
    const users = await this.userModel
      .find()
      .where('_id')
      .in(typeof ids === 'string' ? [ids] : ids)
      .exec();

    return users;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findUsersForClient(
    userId: string,
    searchParam: string,
    skip: number,
    limit: number,
  ) {
    const users = await this.userModel
      .find({
        $and: [
          { username: { $regex: '.*' + searchParam + '.*', $options: 'i' } },
          { _id: { $ne: userId } },
        ],
      })
      .skip(skip)
      .limit(limit)
      .select('-password')
      .exec();

    return users;
  }

  async findOneById(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    img: Express.Multer.File,
  ) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto)
      .setOptions({ overwrite: true, new: true })
      .exec();
    if (!user) {
      throw new NotFoundException();
    }

    if (img) {
      // const HOST = this.configService.get('HOST')
      // const PORT = this.configService.get('PORT')


      const HOST = 'localhost'
      const PORT = '5005'
      user.img = `http://${HOST}:${PORT}/avatars/` + img.filename; // something wrong
    }

    return await user.save();
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) {
      this.logger.log('error: in remove User', result.username);
      throw new NotFoundException();
    }
    this.logger.log('user', result.username, 'was deleted');
  }
}
