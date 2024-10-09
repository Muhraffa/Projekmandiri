import { Controller, Post, Body, Param, Delete, Put, HttpException, HttpStatus, Get } from '@nestjs/common';
import { ptsService } from './pts.service';
import { create } from 'domain';
import { createBookDto } from 'src/book/book.dto';
import { PtsDto } from './pts.dto';
import { Pts } from './pts.entity';

@Controller('siswa')
export class PtsController {
    userService: any;
  siswaService: any;
    constructor(private ptsService: ptsService) {}

    @Get('list')
    async create(@Body() id:number) {
       return this.ptsService.findAll();
    }
  

    @Post('create')
    createSiswa(@Body() payload: any) {
      
      return this.ptsService.create(payload);
    }
      
  
   
    

    @Put ('update/:id')
    async update(@Param('id') id: number, @Body() payload: any) {
        return this.ptsService.update(id, payload);
    }

    

    @Get('detail/:id')
    detail(@Param('id') id: string) {
      return this.ptsService.find(+id);
    }


}


