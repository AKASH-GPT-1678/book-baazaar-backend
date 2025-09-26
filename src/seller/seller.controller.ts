import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateBookListingDto } from './entities/listing.entity';
import { JwtGuard } from 'src/jwt/jwt.guard';
@Controller('api/seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) { }


  @Post('listing')
  @UseGuards(JwtGuard)
  listBooks(@Body() product: CreateBookListingDto, @Req() req: any) {
    console.log(req.user);
    const userId = req.user.sub;  // <- JwtGuard adds `user` to request
    console.log("Mai hoon" + userId);
    return this.sellerService.listBooks(product, userId);
  }



}
