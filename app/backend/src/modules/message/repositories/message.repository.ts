import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {
    super(messageModel);
  }
}
