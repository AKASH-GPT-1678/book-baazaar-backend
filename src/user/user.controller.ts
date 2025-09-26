import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { HttpStatus } from '@nestjs/common';
import { LoginUserDto } from '../auth/dto/auth-dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }



  @UseGuards(JwtGuard)
  @Get("me")
  findAll(@Req() req) {
    const email = req.user.email
    return this.userService.findUserByEmail(email);
  }






}
