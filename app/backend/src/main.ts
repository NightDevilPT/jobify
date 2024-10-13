import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ConfigurationModule.setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
