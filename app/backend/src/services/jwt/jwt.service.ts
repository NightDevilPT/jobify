import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService, // Using NestJS's built-in JWT service
    private readonly configService: ConfigService,
  ) {}

  // Method to sign a token with custom payload and optional expiration time
  async signToken(payload: any, expiresIn?: string): Promise<string> {
    const options = expiresIn
      ? { expiresIn }
      : { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '1h' };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      ...options,
    });
  }

  // Method to verify a token and return the decoded data
  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Method to decode a token without verifying (useful for debugging or extracting payload)
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
