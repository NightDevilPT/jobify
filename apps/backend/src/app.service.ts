import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './services/logger-service/index.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(AppService.name); // easy, dynamic, clean
  }

  getHello(): Record<string, any> {
    const { appName, environment, version, timestamp } = this.getAppInfo();

    return {
      app: appName,
      environment,
      status: 'OK',
      version,
      timestamp,
      message: `🚀 Welcome to ${appName}!`,
      description: `This is the main API entrypoint for the ${appName}. You are running in ${environment} mode.`,
    };
  }

  private getAppInfo() {
    const appName = this.configService.get<string>('app.name') ?? 'Jobify API';
    const environment = (
      this.configService.get<string>('app.env') ?? 'development'
    ).toUpperCase();
    const version = this.configService.get<string>('app.version') ?? '1.0.0';
    const timestamp = new Date().toISOString();

    return { appName, environment, version, timestamp };
  }
}
