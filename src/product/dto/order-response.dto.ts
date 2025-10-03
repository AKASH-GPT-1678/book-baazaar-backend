interface BookListing {


    imageUrl: string;
    isBundle: boolean;
    sellerId: string;

}



export class OrderResponseDto {
    success: boolean;
    message: string;
    id: string;
    title: string;
    imageUrl: string;
    author: string;
    description: string;
    category: string;
    price: number;
    condition: string;
    listingId : string


}

