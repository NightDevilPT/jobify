import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/login-user.command';
import { UserRepository } from '../../repository/user.repository';
import { HttpErrorService } from 'src/services/http-error-service/index.service';
import { HashService } from 'src/services/hash-service/index.service';
import { JwtTokenService } from 'src/services/jwt-token-service/index.service';
import { LoginUserResponseDto } from '../../dto/response-user.dto';
import { ErrorTypes } from 'src/interfaces/error.interface';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly httpErrorService: HttpErrorService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtTokenService,
  ) {}

  async execute({ payload }: LoginUserCommand): Promise<LoginUserResponseDto> {
    const { email, password } = payload;

    // Check if user exists
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw this.httpErrorService.throwError(
        ErrorTypes.Unauthorized,
        'Invalid email or password',
      );
    }

    // Check if password matches
    const isPasswordValid = await this.hashService.compareValue(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw this.httpErrorService.throwError(
        ErrorTypes.Unauthorized,
        'Invalid email or password',
      );
    }

    // Generate JWT token
    const accessToken = await this.jwtService.generateAccessToken({
      id: user.id,
    });

    // Generate refresh token
    const refreshToken = await this.jwtService.generateRefreshToken({
      id: user.id,
    });
    // Return user data and tokens
    return {
      message: 'Login successful',
      accessToken,
      refreshToken,
    };
  }
}
