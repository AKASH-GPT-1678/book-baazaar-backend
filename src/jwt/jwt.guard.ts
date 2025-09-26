import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    // 1️⃣ Check if Authorization header exists
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    // 2️⃣ Extract token
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // 3️⃣ Verify token
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET  });

      // 4️⃣ Attach decoded info to request
      request['user'] = decoded;

      return true; // allow access
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }








}
