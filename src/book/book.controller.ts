import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { retry } from 'rxjs';
import { BookService } from './book.service';
import { query } from 'express';
import { createBookDto, findBookDto } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('list')
  async findAllBook(@Pagination() query: findBookDto) {
    
    return this.bookService.findAllBook(query);
  }

  @Get('detail/:id')
  async detail(@Param('id') id: number) {
    return this.bookService.detail(id);
  }

  @Post('create')
  async createBook(@Body() payload: createBookDto, @Param('id') id: string) {
    return this.bookService.create(payload);
  }

  @Put('update/:id')
  async update(@Body() payload: createBookDto, @Param('id') id: number) {
    return this.bookService.update(id, payload);
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id') id: number) {
    return this.bookService.delete(id);
  }

  @Delete('delete')
  async deletemulti(@Query('id') id: string) {
    const idArray = id.split(',');
    return this.bookService.deletemulti(idArray);
  }
}

