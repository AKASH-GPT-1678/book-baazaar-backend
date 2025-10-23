import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaServices } from 'src/prisma.service';
import { RegisterResponseDto } from '../auth/dto/auth-dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { genRatePassword, comparePassword } from '../auth/helpers/bcrypt';
import { LoginUserDto } from '../auth/dto/auth-dto';
@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaServices

  ) { }


  async findUserByEmail(email: string): Promise<any> {
    const user = await this.prisma.users.findUnique({ where: { email: email } })
    if (!user) {
      throw new NotFoundException('User not found')
    }



    return user;
  };








}
