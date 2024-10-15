import { ApplicationCommandHandlers } from './commands';
import { ApplicationQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './entities/application.entity';
import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],

  controllers: [ApplicationController],
  providers: [ApplicationService, ...ApplicationCommandHandlers, ...ApplicationQueryHandlers],

})
export class ApplicationModule {}
