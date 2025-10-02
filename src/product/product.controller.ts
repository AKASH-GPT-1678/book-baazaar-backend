import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}




  @Get('listings/:category')
  async loadProducts(@Param('category') category: string) {
    const products = await this.productService.loadProducts(category);

    return products; 
  }
 
}
