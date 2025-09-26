import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaServices } from 'src/prisma.service';
import { CreateBookListingDto } from './entities/listing.entity';
@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaServices) { }

  async listBooks(product: CreateBookListingDto, userId: string) {

    const book = await this.prisma.bookListing.create({
      data: {
        title: product.title,
        author: product.author,
        description: product.description,
        price: parseFloat(product.price),
        condition: product.condition,
        isBundle: product.isBundle,
        category: product.category,
        imageUrl: product.imageUrl,
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


