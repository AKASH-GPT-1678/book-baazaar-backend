import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { PrismaServices } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';


@Module({
  controllers: [SellerController],
  providers: [SellerService, PrismaServices, JwtService, AppService],
})
export class SellerModule { }
