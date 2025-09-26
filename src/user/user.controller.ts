import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { HttpStatus } from '@nestjs/common';
import { LoginUserDto } from '../auth/dto/auth-dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }






}
