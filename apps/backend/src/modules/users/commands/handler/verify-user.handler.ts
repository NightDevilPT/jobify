import { CommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '../impl/verify-user.command';
import { UserRepository } from '../../repository/user.repository';
import { HttpErrorService } from 'src/services/http-error-service/index.service';
import { ErrorTypes } from 'src/interfaces/error.interface';
import { VerifyUserResponseDto } from '../../dto/response-user.dto';

@CommandHandler(VerifyUserCommand)
export class VerifyUserCommandHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpErrorService: HttpErrorService,
  ) {}

  async execute(command: VerifyUserCommand): Promise<VerifyUserResponseDto> {
    const { token } = command;

    // Retrieve the user associated with the provided token
    const user = await this.userRepository.findByToken(token);
    
    if (!user) {
      // Throw error if user is not found
      this.httpErrorService.throwError(ErrorTypes.NotFound, 'User not found');
    }

    // Validate the token and ensure it's not expired
    const updatedUser = await this.userRepository.update(user?._id as string, {
      isVerified: true,
      token: '',
    });
    
    if (!updatedUser) {
      // Handle error if user verification update fails
      this.httpErrorService.throwError(
        ErrorTypes.InternalServerError,
        'Failed to update user verification status',
      );
    }

    // Return success response upon successful verification
    return { message: 'User successfully verified' };
  }
}
