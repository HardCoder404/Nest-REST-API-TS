import { IsEnum, IsOptional, IsNumber, IsString } from "class-validator";
import { Category } from "../book.schema";


export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, { message: "Please select a valid category" })
    readonly category: Category;
}