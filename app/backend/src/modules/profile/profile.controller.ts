import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiConsumes,
  ApiParam,
  ApiQuery,
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

  @Get()
  @ApiOperation({ summary: 'Get all profiles with filters and pagination' })
  @ApiQuery({ name: 'firstname', required: false, description: 'Filter by firstname' })
  @ApiQuery({ name: 'lastname', required: false, description: 'Filter by lastname' })
  @ApiQuery({ name: 'gender', required: false, description: 'Filter by gender' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit of profiles per page', type: Number })
  async getAllProfiles(
    @Query('firstname') firstname: string,
    @Query('lastname') lastname: string,
    @Query('gender') gender: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    // Construct filters based on query parameters
    const filters: any = {};
    if (firstname) filters.firstname = new RegExp(firstname, 'i');
    if (lastname) filters.lastname = new RegExp(lastname, 'i');
    if (gender) filters.gender = gender;

    // Fetch profiles using the service
    return this.profileService.getAllProfiles(filters, Number(page), Number(limit));
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
