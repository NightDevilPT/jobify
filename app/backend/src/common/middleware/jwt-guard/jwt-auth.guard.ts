// src/middleware/jwt-auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from 'src/services/jwt/jwt.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token using your custom JwtService
      const decoded = await this.jwtService.verifyToken(token);

      // Attach the decoded user to the request object
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
