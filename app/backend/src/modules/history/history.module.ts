import { HistoryCommandHandlers } from './commands';
import { HistoryQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './entities/history.entity';
import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
  controllers: [HistoryController],
  providers: [HistoryService, ...HistoryCommandHandlers, ...HistoryQueryHandlers],

})
export class HistoryModule {}
