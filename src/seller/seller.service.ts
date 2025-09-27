import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaServices } from 'src/prisma.service';
import { CreateBookListingDto } from './entities/listing.entity';
import { AppService } from 'src/app.service';
@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaServices,
    private readonly appService: AppService


  ) { }

async listBooks(product: CreateBookListingDto, userId: string, imageUrl: string) {
  try {
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
            id: userId,
          },
        },
      },
    });

    console.log("✅ Book created successfully:", book);
    return book;
  } catch (error) {
    console.error("❌ Error creating book:", error);
    throw error; // rethrow so the error can be handled by the caller
  }
}

  async loadListings(sellerId: string) {
    const findSeller = await this.prisma.users.findUnique({
      where: {
        id: sellerId
      }
    });

    if (!findSeller) {
      throw new NotFoundException("Seller not found");
    };
    const books = await this.prisma.bookListing.findMany({
      where: {
        sellerId: sellerId
      }
    });

    if (books.length == 0) {
      throw new NotFoundException("No books found");
    }
    return books;
  }
}


