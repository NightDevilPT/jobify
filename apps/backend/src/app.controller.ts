import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ErrorTypes } from './interfaces/error.interface';
import { JwtTokenService } from './services/jwt-token-service/index.service';
import { HttpErrorService } from './services/http-error-service/index.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly httpError:HttpErrorService
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
  throwDummyError() {
    return this.httpError.throwError(ErrorTypes.NotFound, 'Dummy error');
  }
}
