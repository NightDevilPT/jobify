// Modules
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { JwtModule } from 'src/services/jwt/jwt.module';
import { ErrorModule } from 'src/services/error/error.module';
import { LoggerModule } from 'src/services/logger/logger.module';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
// Entities & Schema
import { Profile, ProfileSchema } from './entities/profile.entity';
import { User, UserSchema } from '../user/entities/user.entity';
// Repositories
import { ProfileRepository } from './repositories/profile.repository';
import { UserRepository } from '../user/repositories/user.repository';
// Command & Query Handlers
import { ProfileCommandHandlers } from './commands';
import { ProfileQueryHandlers } from './queries';
// Middleware
import { JwtAuthMiddleware } from 'src/common/middleware/jwt-guard/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
    LoggerModule,
    ErrorModule,
    CqrsModule,
    JwtModule,
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    UserRepository,
    ...ProfileCommandHandlers,
    ...ProfileQueryHandlers,
  ],
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Apply JwtAuthMiddleware
      .forRoutes(ProfileController); // Apply to all routes in ProfileController
  }
}
