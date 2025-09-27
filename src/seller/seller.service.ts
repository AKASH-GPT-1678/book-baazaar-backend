import { Injectable } from '@nestjs/common';
import { PrismaServices } from 'src/prisma.service';
import { CreateBookListingDto } from './entities/listing.entity';
import { AppService } from 'src/app.service';
@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaServices,
    private readonly appService: AppService


  ) { }

  async listBooks(product: CreateBookListingDto, userId: string, imageUrl: string) {


    const book = await this.prisma.bookListing.create({
      data: {
        title: product.title,
        author: product.author,
        description: product.description,
        price: parseFloat(product.price),
        condition: product.condition,
        isBundle: product.isBundle,
        category: product.category,
        imageUrl: imageUrl,
        seller: {
          connect: {
            id: userId
          }
        }
      }
    })
    return book;

  }
}


