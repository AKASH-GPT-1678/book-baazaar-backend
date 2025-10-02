import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from "@nestjs/jwt";
import { PrismaServices } from 'src/prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterResponseDto, LoginUserDto } from 'src/auth/dto/auth-dto';
import { genRatePassword, comparePassword } from './helpers/bcrypt';
import { use } from 'passport';
@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaServices
    ) {


    }

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
            console.log(email , password);

 
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
            response.id = user.id;
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


    async generateToken(user: any) {
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return {
            email: user.email,
            success: true,
            access_token: access_token
        }
    }
}
