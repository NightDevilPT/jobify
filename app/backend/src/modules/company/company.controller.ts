import { Body, Controller, Post, Put, Delete, Param, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { UserRequest } from 'src/common/interfaces/common.interface';
import { User } from 'src/common/decorator/jwt-payload.decorator';
import { Types } from 'mongoose';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded', 'multipart/form-data')
  @ApiOperation({ summary: 'Create a new company' })
  async createCompany(@Body() createCompanyDto: CreateCompanyDto, @User() user: UserRequest) {
    return this.companyService.createCompany(createCompanyDto, user);
  }

  @Put(':companyId')
  @ApiOperation({ summary: 'Update an existing company' })
  @ApiParam({ name: 'companyId', description: 'ID of the company to update', type: String })
  async updateCompany(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('companyId') companyId: Types.ObjectId,
    @User() user: UserRequest,
  ) {
    return this.companyService.updateCompany(updateCompanyDto, user, companyId);
  }

  @Delete(':companyId')
  @ApiOperation({ summary: 'Delete an existing company' })
  @ApiParam({ name: 'companyId', description: 'ID of the company to delete', type: String })
  async deleteCompany(@Param('companyId') companyId: Types.ObjectId, @User() user: UserRequest) {
    return this.companyService.deleteCompany(companyId, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get a company for a user' })
  async getCompanyByUserId(@User() user: UserRequest) {
    return this.companyService.getCompanyByUserId(user.userId);
  }
}
