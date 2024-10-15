import { MessageCommandHandlers } from './commands';
import { MessageQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],

  controllers: [MessageController],
  providers: [MessageService, ...MessageCommandHandlers, ...MessageQueryHandlers],

})
export class MessageModule {}
