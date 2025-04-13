import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { MongooseConfigService } from './config/mongoose.config';
import { LoggerService } from './services/logger-service/index.service';
import { JwtTokenService } from './services/jwt-token-service/index.service';
import { HttpErrorService } from './services/http-error-service/index.service';
import { modules } from './modules/index.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    JwtModule.register({}),
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtTokenService,
    LoggerService,
    HttpErrorService
  ],
})
export class AppModule {}
