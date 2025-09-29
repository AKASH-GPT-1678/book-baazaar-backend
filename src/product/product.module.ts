import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaServices } from 'src/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaServices],
})
export class ProductModule { }
