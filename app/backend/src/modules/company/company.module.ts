import { CompanyCommandHandlers } from './commands';
import { CompanyQueryHandlers } from './queries';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],

  controllers: [CompanyController],
  providers: [CompanyService, ...CompanyCommandHandlers, ...CompanyQueryHandlers],

})
export class CompanyModule {}
