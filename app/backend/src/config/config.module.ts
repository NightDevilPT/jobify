import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import configuration from './index';
import { SwaggerConfig } from './swagger/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoose.uri'),
      }),
    }),
  ],
})
export class ConfigurationModule implements OnModuleInit {
  private readonly logger = new Logger('MongoDB');

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const connection = mongoose.connection;

    connection.on('connected', () => {
      this.logger.log('MongoDB connection established successfully!');
    });

    connection.on('error', (err) => {
      this.logger.error(`MongoDB connection error: ${err.message}`);
    });

    connection.on('disconnected', () => {
      this.logger.warn('MongoDB connection disconnected!');
    });
  }

  static setupSwagger(app: any) {
    SwaggerConfig.setupSwagger(app);  // Call the Swagger setup method
  }
}
