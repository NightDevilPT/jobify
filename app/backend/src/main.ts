import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationModule } from './config/config.module';
import { TimingInterceptor } from './common/middleware/time-interceptor/timing.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TimingInterceptor());
  ConfigurationModule.setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
