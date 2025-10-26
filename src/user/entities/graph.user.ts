// user.entity.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { BookListing, Order, Favorites } from '@prisma/client';
// book-listing.entity.ts
enum OrderStatus {
    PENDING,
    COMPLETED,
    CANCELLED
}
@ObjectType()
export class BookListingG {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    author: string;

    @Field(() => Float)
    price: number;
}
@ObjectType()
export class OrderG {
    @Field(() => ID)
    id: string;

    @Field()
    status: OrderStatus;
}

@ObjectType()
export class FavoritesG {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    bookListingId?: string;
}

@ObjectType()
export class UserG {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    contact?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    // Relations (optional)
    @Field(() => [BookListingG], { nullable: true })
    listings?: BookListing[];

    @Field(() => [OrderG], { nullable: true })
    orders?: Order[];

    @Field(() => [FavoritesG], { nullable: true })
    favorites?: Favorites[];
}
