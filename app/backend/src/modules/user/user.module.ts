import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ErrorModule } from 'src/services/error/error.module';
import { LoggerModule } from 'src/services/logger/logger.module';
import { UserRepository } from './repositories/user.repository';
import { HashModule } from 'src/services/hash/hash.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    ErrorModule,
    LoggerModule,
    HashModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
