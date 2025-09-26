import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaServices } from 'src/prisma.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({

  controllers: [UserController],
  providers: [UserService, PrismaServices, AuthService, JwtService],
})
export class UserModule {}
