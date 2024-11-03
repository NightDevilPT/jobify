import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCompanyCommand } from '../impl/update-company.command';
import { CompanyRepository } from '../../repositories/company.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { UserType } from 'src/common/interfaces/common.interface';

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyHandler implements ICommandHandler<UpdateCompanyCommand> {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: UpdateCompanyCommand): Promise<any> {
    const { updateCompanyDto, companyId, user } = command;

    // Check if the user has the recruiter role
    if (user.role !== UserType.RECRUITER) {
      this.errorService.throwForbiddenError(
        'Only recruiters are authorized to create a company',
      );
    }

    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      this.errorService.throwNotFoundError('Company not found');
    }

    const updatedCompany = await this.companyRepository.update(companyId, updateCompanyDto);
    this.logger.log(`Company updated with ID: ${companyId}`);
    return updatedCompany;
  }
}
