import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaServices } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaServices
  ) { }

  async saveUser(createDto: CreateUserDto) {
    try {

      let existingUser = await this.prisma.user.findFirst({
        where: { email: createDto.email }
      });
      if (existingUser) {
        throw new ConflictException("User already Exists with this email");
      }
      const user = await this.prisma.user.create({
        data: {
          name: createDto.name,
          email: createDto.email,
          password: createDto.password, 
        },
      });
      console.log(user);

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException("Something Went Wrong ");


    
    }
  }






}
