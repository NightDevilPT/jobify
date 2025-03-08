import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ConfigurationModule } from './config/config.module';
import { TimingInterceptor } from './common/middleware/time-interceptor/timing.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimingInterceptor());
  app.use(cookieParser());
  ConfigurationModule.setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
