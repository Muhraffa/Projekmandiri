// dto adalah sebuah kelas

import { OmitType } from "@nestjs/mapped-types"
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, Length, Max, Min, MinLength } from "class-validator";
import { clearScreenDown } from "readline";
import { In } from "typeorm";

export class BookDto {
    @IsOptional()
    id: number;
    
    @IsNotEmpty({message : "kolom wajib diisi"})
    @Length(5, 100, { message: 'min 5 dan max 100' })
    title: string;

    @IsNotEmpty()
    author: string;

    @IsInt()
    @Min(2020)
    @Max(2024)
    year: number;

    @IsNotEmpty()
    @MinLength(10)
    deskripsi: string;
}

export class createBookDto extends OmitType(BookDto, ['id']) {}
export class updateBookDto extends BookDto {}
export class findBookDto { 
    @IsInt()
    @Type(() => Number)
    page= 1;

    @IsInt()
    @Type(() => Number)
    PageSize= 10;

    @IsOptional()
    @IsInt()
    limit: number

    @IsOptional()
    title: string

    @IsOptional()
    author: string

    @IsOptional()
    deskripsi: string

    @IsOptional()
    @IsInt()
    @Type(() => Number) 
    from_year:number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    to_year:number

    @IsOptional()
    keyword: string


}