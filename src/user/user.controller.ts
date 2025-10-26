import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpStatus, HttpException } from '@nestjs/common';
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

  @UseGuards(JwtGuard)
  @Post("address")
  @HttpCode(200)
  addUserAddress(@Req() req, @Body("address") address: string) {

    const id = req.user.sub;
    if (!id) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    return this.userService.addUserAddress(id, address);
  }






}
