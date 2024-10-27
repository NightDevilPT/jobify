import { EducationCommandHandlers } from './commands';
import { EducationQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from './entities/education.entity';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { ProfileRepository } from '../profile/repositories/profile.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { Profile, ProfileSchema } from '../profile/entities/profile.entity';
import { ErrorModule } from 'src/services/error/error.module';
import { LoggerModule } from 'src/services/logger/logger.module';
import { EducationRepository } from './repositories/education.repository';
import { JwtAuthMiddleware } from 'src/common/middleware/jwt-guard/jwt-auth.guard';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Education.name, schema: EducationSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CqrsModule,
    ErrorModule,
    LoggerModule,
    JwtModule
  ],

  controllers: [EducationController],
  providers: [
    EducationService,
    ProfileRepository,
    UserRepository,
    EducationRepository,
    ...EducationCommandHandlers,
    ...EducationQueryHandlers,
  ],
})
export class EducationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Apply JwtAuthMiddleware
      .forRoutes(EducationController); // Apply to all routes in ProfileController
  }
}
