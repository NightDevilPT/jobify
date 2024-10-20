import {
  Body,
  Controller,
  Post,
  Req
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiTags, ApiOperation, ApiCookieAuth, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCookieAuth('cookie-auth')
  async createProfile(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const userId = req.user.userId;
    return this.profileService.createProfile(createProfileDto, userId);
  }
}
