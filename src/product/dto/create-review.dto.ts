export class CreateReviewDto {
  title: string;
  description?: string;
  bookId: string;
  reviewId?: string; // reviewer id
}
