import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaServices } from 'src/prisma.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';
@Module({

  controllers: [UserController],
  providers: [UserService, PrismaServices, AuthService, JwtService, UserResolver],
})
export class UserModule {}
