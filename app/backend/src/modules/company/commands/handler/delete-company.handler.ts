import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCompanyCommand } from '../impl/delete-company.command';
import { CompanyRepository } from '../../repositories/company.repository';
import { LoggerService } from 'src/services/logger/logger.service';
import { ErrorService } from 'src/services/error/error.service';
import { UserType } from 'src/common/interfaces/common.interface';

@CommandHandler(DeleteCompanyCommand)
export class DeleteCompanyHandler implements ICommandHandler<DeleteCompanyCommand> {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly logger: LoggerService,
    private readonly errorService: ErrorService,
  ) {}

  async execute(command: DeleteCompanyCommand): Promise<any> {
    const { companyId, user } = command;

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

    await this.companyRepository.delete(companyId);
    this.logger.log(`Company deleted with ID: ${companyId}`);
    return { message: `Company ${companyId} successfully deleted` };
  }
}
