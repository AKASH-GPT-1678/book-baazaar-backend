import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, Query, } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateBookListingDto } from './entities/listing.entity';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
@Controller('api/seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService,
    private readonly appService: AppService


  ) { }

    // Put specific routes FIRST
  @Get("load")
  async getProductById(@Query("id") id: string) {
    console.log("Loading product by id:", id);
    return await this.sellerService.loadProductById(id);
  }

  @Post('list')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  async listBooks(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    let fileUrl: string = "https://placehold.co/400";


    const product = req.body;

    console.log('Form data:', product);
    console.log('File:', file);

    if (file) {
      console.log('File filename:', file.filename);
      fileUrl = await this.appService.uploadFile(file);
    }

    console.log('User:', req.user);
    const userId = req.user.sub;

    return this.sellerService.listBooks(product, userId, fileUrl);
  }


  @Get('listings')
  @UseGuards(JwtGuard)
  async loadListings(@Req() req: any) {
    const sellerId = req.user.sub;
    return this.sellerService.loadListings(sellerId);
  }





}
