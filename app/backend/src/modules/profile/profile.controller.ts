import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { User } from 'src/common/decorator/jwt-payload.decorator';
import { UserRequest } from 'src/common/interfaces/common.interface';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':profileId')
  @ApiOperation({ summary: 'Get a profile by ID' })
  @ApiParam({
    name: 'profileId',
    description: 'ID of the profile to retrieve',
    type: String,
  })
  async getProfileById(@Param('profileId') profileId: string): Promise<any> {
    return this.profileService.getProfileById(profileId);
  }

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiCookieAuth('cookie-auth')
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @User() user: UserRequest,
  ): Promise<any> {
    const { userId } = user;
    return this.profileService.createProfile(createProfileDto, userId);
  }

  @Put(':profileId')
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Update an existing profile' })
  @ApiCookieAuth('cookie-auth')
  @ApiParam({
    name: 'profileId',
    description: 'ID of the profile to update',
    type: String,
  })
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Param('profileId') profileId: string,
  ): Promise<any> {
    return this.profileService.updateProfile(updateProfileDto, profileId);
  }
}
