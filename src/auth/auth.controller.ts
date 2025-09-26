import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto,  } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/auth-dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
      const user = await this.authService.saveUser(createUserDto);
      if (!user) return { statusCode: HttpStatus.BAD_REQUEST, message: 'User could not be created' };
      return user;
    }
  
  
    @Post('login')
    @HttpCode(HttpStatus.ACCEPTED)
    async login(@Body() loginDto: LoginUserDto) {
      const loginAttempt = await this.authService.loginUser(loginDto);
      if(loginAttempt.success){
        return this.authService.generateToken(loginAttempt);

      }
      
  
    }
}
