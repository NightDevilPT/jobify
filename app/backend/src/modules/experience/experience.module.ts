// File: src/modules/experience/experience.module.ts

import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ExperienceCommandHandlers } from './commands';
import { ExperienceQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './entities/experience.entity';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { ProfileRepository } from '../profile/repositories/profile.repository';
import { ExperienceRepository } from './repositories/experience.repository';
import { LoggerModule } from 'src/services/logger/logger.module';
import { ErrorModule } from 'src/services/error/error.module';
import { JwtAuthMiddleware } from 'src/common/middleware/jwt-guard/jwt-auth.guard';
import { CqrsModule } from '@nestjs/cqrs';
import { Profile, ProfileSchema } from '../profile/entities/profile.entity';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { UserRepository } from '../user/repositories/user.repository';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Experience.name, schema: ExperienceSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CqrsModule,
    ErrorModule,
    LoggerModule,
    JwtModule,
  ],
  controllers: [ExperienceController],
  providers: [
    ExperienceService,
    ProfileRepository,
    UserRepository,
    ExperienceRepository,
    ...ExperienceCommandHandlers,
    ...ExperienceQueryHandlers,
  ],
})
export class ExperienceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Apply JwtAuthMiddleware
      .forRoutes(ExperienceController); // Apply to all routes in ExperienceController
  }
}
