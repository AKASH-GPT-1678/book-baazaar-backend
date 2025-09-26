import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaServices } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [
    UserModule , 
   
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions : {expiresIn : '1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaServices , UserService, JwtService],

})
export class AuthModule {}
