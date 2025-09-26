import { IsString, IsBoolean, IsOptional, IsEnum } from "class-validator";
import { Prisma } from "@prisma/client";
import {Condition} from "@prisma/client"



export class CreateBookListingDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    description?: string;


    @IsString()
    price: string;

    @IsString()
    @IsEnum(Condition)
    condition: Condition;

    @IsOptional()
    @IsBoolean()
    isBundle?: boolean;

    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}
