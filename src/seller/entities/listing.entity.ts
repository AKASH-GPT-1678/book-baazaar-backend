import { IsString, IsBoolean, IsOptional, IsEnum } from "class-validator";
import { Condition } from "@prisma/client"

import { Transform } from "class-transformer";

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
    @Transform(({ value }) => value === 'true')
    isBundle?: boolean;

    @IsString()
    category: string;


}
