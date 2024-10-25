// src/middleware/jwt-auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from 'src/services/jwt/jwt.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new UnauthorizedException('Authorization token missing.');
    }

    try {
      const decoded = await this.jwtService.decodeToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
