import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModules } from './modules';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [
    ConfigurationModule,
    ...AllModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
