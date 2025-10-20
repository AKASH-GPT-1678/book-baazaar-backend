import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }




  @Get('listings/:category')
  async loadProducts(@Param('category') category: string) {

    const products = await this.productService.loadProducts(category);


    return products;
  }

  @Get(":id")
  async getProductById(@Param("id") id: string) {
    return await this.productService.loadProductById(id);
  }

  @Put("view/:id")
  async addView(@Param("id") id: string) {
    return await this.productService.addView(id);
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
    console.log(req);
    const userId = req.user.sub;
    console.log(userId)
    const order = await this.productService.loadOrders(userId);
    console.log(order)
    return { message: 'Orders loaded Successfully', order };
  }


}
