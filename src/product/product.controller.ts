import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @Get('listings/:category')
  async loadProducts(@Param('category') category: string) {

    const products = await this.productService.loadProducts(category);
    return products;
  }
  @Put("view/:id")
  async addView(@Param("id") id: string) {
    return await this.productService.addView(id);
  }
  @Post('review')
  @UseGuards(JwtGuard)
  async addReview(@Req() req,@Body() review: CreateReviewDto) {
    const userId = req.user.sub;
    review.reviewId = userId;
    return await this.productService.addReview(review);


  }



  @Post('placeorder')
  @UseGuards(JwtGuard)
  async placeOrder(@Req() req, @Body() dto: CreateOrderDto) {
    const userId = req.user.sub;
    const order = await this.productService.createOrder(userId, dto);
    return { message: 'Order placed successfully', order };
  }

  @Get('load/orders')
  @UseGuards(JwtGuard)
  async loadBuyerOrder(@Req() req) {

    const userId = req.user.sub;

    const order = await this.productService.loadOrders(userId);

    return { message: 'Orders loaded Successfully', order };
  };


  @UseGuards(JwtGuard)
  @Post('favorite')
  async addToFavorites(
    @Req() req: any,
    @Body('listingId') listingId: string,
  ) {
    const userId = req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    console.log('Working')

    return this.productService.addFavorite(userId, listingId);
  };
  @UseGuards(JwtGuard)
  @Get('favorites')
  async getUserFavorites(@Req() req: any) {
    // req.user is set by JwtAuthGuard after validating token
    const userId = req.user.sub;
    return this.productService.getFavoritesByUser(userId);
  }


  @Get('bundles/:category')
  @HttpCode(HttpStatus.OK)
  async getBundlesByCategory(
    @Param('category') category: string
  ) {
    try {
      const bundles = await this.productService.loadBundles(category.trim().toString());
      return {
        success: true,
        category,
        total: bundles.length,
        data: bundles,
      };
    } catch (error) {
      // Let NestJS handle custom exceptions automatically (BadRequest, NotFound, etc.)
      throw error;
    }
  }


}
