import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaServices } from 'src/prisma.service';
@Module({
  controllers: [UserController],
  providers: [UserService, PrismaServices],
})
export class UserModule {}
