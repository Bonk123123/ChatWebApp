import { Response, response, Request } from 'express';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @Post('login')
  async logIn(
    @Body() createAuthenticationDto: CreateAuthenticationDto,
    @Res() response: Response,
  ) {
    const user = await this.authenticationService.verifyUser(
      createAuthenticationDto,
    );

    const cookie = this.authenticationService.getCookieWithJwtToken(user._id);

    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @HttpCode(200)
  @Get()
  async findUserByToken(@Req() request: Request, @Res() response: Response) {
    const token = request.headers.authorization;
    const user =
      await this.authenticationService.getUserFromAuthenticationToken(token);
    user.password = undefined;
    return response.send(user);
  }

  @HttpCode(200)
  @Post(':id')
  async confirmEmail(@Param('id') id: string) {
    await this.confirmEmail(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
