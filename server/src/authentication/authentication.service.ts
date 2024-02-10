import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  private logger: Logger = new Logger('Authentication Service');

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  

  public async getUserFromAuthenticationToken(token: string) {
    if(!token) return;
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    if (payload.userId) {
      return this.usersService.findOneById(payload.userId);
    }
  }

  public async verifyUser(createAuthenticationDto: CreateAuthenticationDto) {
    const user = await this.usersService.findOneByEmail(
      createAuthenticationDto.email,
    );

    if (!user)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );

    // if (!user.isEmailConfirmed)
    //   throw new HttpException('Confirm your email', HttpStatus.BAD_REQUEST);

    const isPasswordMatching = await this.verifyPassword(
      createAuthenticationDto.password,
      user.password,
    );

    if (!isPasswordMatching)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    return isPasswordMatching;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
