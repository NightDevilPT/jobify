import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/guard/cookie-auth.guard';
import { JwtTokenService } from './services/jwt-token-service/index.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  @Get()
  getHello(@Res() res: Response): void {
    // Dummy payload
    const payload = { userId: '12345', role: 'user' };

    const accessToken = this.jwtTokenService.generateAccessToken(payload);
    const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

    this.jwtTokenService.generateCookieTokens(res, accessToken, refreshToken);

    res.status(200).json({
      data: this.appService.getHello(),
      message: 'Welcome message fetched successfully with tokens',
      statusCode: 200,
    });
  }

  @Get('error')
  throwDummyError(): never {
    throw new HttpException(
      {
        message: 'This is a dummy error for testing',
        error: 'DummyError',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
