import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaServices } from 'src/prisma.service';
import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { title } from 'process';
import { OrderResponseDto } from './dto/order-response.dto';
@Injectable()
export class ProductService {
  constructor(

    private readonly prisma: PrismaServices
  ) {

  }





  async loadProducts(category: string) {
    try {

      if (!category || typeof category !== 'string') {
        throw new BadRequestException('Category is required and must be a string.');
      }


      const products = await this.prisma.bookListing.findMany({
        where: {
          category: category
        },
        take: 10
      });

      if (!products || products.length === 0) {
        throw new NotFoundException(`No products found in category: ${category}`);
      }

      return products;

    } catch (error) {
      console.log(error);

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }


      throw new InternalServerErrorException('Failed to load products. Please try again later.', error);
    }
  }




  async loadProductById(id: string) {
    try {
      // 1. Check if ID is provided
      if (!id) {
        throw new BadRequestException("Id cannot be empty");
      }

      // 2. Fetch product from DB
      const product = await this.prisma.bookListing.findUnique({
        where: { id },
      });


      if (!product) {
        throw new NotFoundException("No such product found");
      }


      return product;

    } catch (error) {
      // 5. Known NestJS exceptions should be re-thrown
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // 6. Unknown error (e.g. DB connection issue)
      throw new InternalServerErrorException(
        "Something went wrong while fetching the product"
      );
    }
  }


  async createOrder(userId: string, dto: CreateOrderDto) {
    const { productId, quantity } = dto;

    if (!userId) {
      throw new BadRequestException('User must be logged in to place an order.');
    }


    const listing = await this.prisma.bookListing.findUnique({
      where: { id: productId },
    });

    if (!listing) {
      throw new NotFoundException('Product not found');
    }

    try {

      const order = await this.prisma.order.create({
        data: {
          buyerId: userId,
          listingId: productId,

        },
      });

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new InternalServerErrorException('Failed to place order');
    }
  }

  async loadOrders(userId: string) {
    try {

      if (!userId) {
        throw new BadRequestException('User ID must be provided');
      }


      const orders = await this.prisma.order.findMany({
        where: { buyerId: userId },
        include: {
          listing: true,
        }

      });
      console.log(orders);


      if (!orders || orders.length === 0) {
        return [];
      };


      const refineOrders = orders.map((data) => {

        return {

          id: data.id,
          title: data.listing.title,
          imageUrl: data.listing.imageUrl,
          author: data.listing.author,
          description: data.listing.description,
          category: data.listing.category,
          price: data.listing.price,
          condition: data.listing.condition,
          listingId: data.listingId


        } as OrderResponseDto;
      });


      return refineOrders;

    } catch (error) {
      console.log(error);

      if (
        error instanceof BadRequestException

      ) {
        throw error;
      }

 
      console.error('Error loading orders:', error);
      throw new InternalServerErrorException(
        'Something went wrong while fetching orders',
        error
      );
    }
  }

}