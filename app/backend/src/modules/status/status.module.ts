import { StatusCommandHandlers } from './commands';
import { StatusQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from './entities/status.entity';
import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }])],

  controllers: [StatusController],
  providers: [StatusService, ...StatusCommandHandlers, ...StatusQueryHandlers],

})
export class StatusModule {}
