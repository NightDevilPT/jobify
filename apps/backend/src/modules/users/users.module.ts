import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { CommandHandlers } from './commands';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MailModule } from 'src/services/mail/mail.module';
import { UserRepository } from './repository/user.repository';
import { HashService } from 'src/services/hash-service/index.service';
import { HttpErrorService } from 'src/services/http-error-service/index.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    MailModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    HttpErrorService,
    HashService,
    ...CommandHandlers,
  ],
})
export class UsersModule {}
