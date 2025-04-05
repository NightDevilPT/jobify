import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): Record<string, any> {
    const appName = this.configService.get<string>('app.name') ?? 'Jobify API';
    const environment = this.configService.get<string>('app.env') ?? 'development';
    const version = this.configService.get<string>('app.version') ?? '1.0.0';

    return {
      app: appName,
      environment: environment.toUpperCase(),
      status: 'OK',
      version,
      timestamp: new Date().toISOString(),
      message: `🚀 Welcome to ${appName}!`,
      description: `This is the main API entrypoint for the ${appName}. You are running in ${environment.toUpperCase()} mode.`,
    };
  }
}
