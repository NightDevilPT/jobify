import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { MongooseConfigService } from './config/mongoose.config';
import { JwtTokenService } from './services/jwt-token-service/index.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, JwtTokenService],
})
export class AppModule {}
