import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaServices } from 'src/prisma.service';
import { RegisterResponseDto } from './dto/auth-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { genRatePassword, comparePassword } from './helpers/bcrypt';
import { LoginUserDto } from './dto/auth-dto';
@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaServices

  ) { }

  async saveUser(createDto: CreateUserDto): Promise<RegisterResponseDto> {
    try {
      if (createDto.password != createDto.confirmPassword) {
        throw new BadRequestException("Password and Confirm password Should match");
      }



      let existingUser = await this.prisma.users.findFirst({
        where: { email: createDto.email }
      });

      if (existingUser) {
        throw new ConflictException("User already Exists with this email");
      };

      const hash = await genRatePassword(createDto.password);
      const user = await this.prisma.users.create({
        data: {
          name: createDto.name,
          email: createDto.email,
          password: hash.toString(),
        },
      });
      console.log(user);
      const response = new RegisterResponseDto();
      response.name = user.name;
      response.email = user.email;
      response.success = true;
      response.message = 'User registered successfully';


      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException("Something Went Wrong ");



    }
  };

  async loginUser(loginDto: LoginUserDto): Promise<RegisterResponseDto> {
    try {
      const { email, password } = loginDto;

      // Step 1: Validate input
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }


      const user = await this.prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

    
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }


      const response = new RegisterResponseDto();
      response.name = user.name;
      response.email = user.email;
      response.success = true;
      response.message = 'Login successful';

      return response;

    } catch (error) {
      console.error('Error logging in user:', error);

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }


      throw new InternalServerErrorException('Something went wrong');
    }
  }






}
