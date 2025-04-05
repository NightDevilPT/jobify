import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Record<string, any> {
    return {
      data: this.appService.getHello(),
      message: 'Welcome message fetched successfully',
      statusCode: 200,
    };
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
