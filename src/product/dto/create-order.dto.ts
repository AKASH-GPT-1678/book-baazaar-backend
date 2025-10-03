// src/order/dto/create-order.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number; // optional if your orders support quantity
}


