import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './repositories/company.repository';
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from 'src/services/logger/logger.module';
import { ErrorModule } from 'src/services/error/error.module';
import { CompanyCommandHandlers } from './commands';
import { CompanyQueryHandlers } from './queries';
import { Profile, ProfileSchema } from '../profile/entities/profile.entity';
import { JwtAuthMiddleware } from 'src/common/middleware/jwt-guard/jwt-auth.guard';
import { JwtModule } from 'src/services/jwt/jwt.module';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
    CqrsModule,
    LoggerModule,
    ErrorModule,
    JwtModule
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    ProfileRepository,
    UserRepository,
    ...CompanyCommandHandlers,
    ...CompanyQueryHandlers,
  ],
})
export class CompanyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware) // Apply JwtAuthMiddleware
      .forRoutes(CompanyController); // Apply to all routes in ProfileController
  }
}
