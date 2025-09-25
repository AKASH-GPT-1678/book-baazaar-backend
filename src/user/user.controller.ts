import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './dto/auth-dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.saveUser(createUserDto);
    if (!user) return { statusCode: HttpStatus.BAD_REQUEST, message: 'User could not be created' };
    return user;
  }


  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() loginDto : LoginUserDto) {
    const loginAttempt = await this.userService.loginUser(loginDto);
    return loginAttempt;

  }




}
