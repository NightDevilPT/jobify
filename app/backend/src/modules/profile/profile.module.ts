import { ProfileCommandHandlers } from './commands';
import { ProfileQueryHandlers } from './queries';
import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Profile.name,schema:ProfileSchema}])],
  controllers: [ProfileController],
  providers: [ProfileService, ...ProfileCommandHandlers, ...ProfileQueryHandlers],
})
export class ProfileModule {}
