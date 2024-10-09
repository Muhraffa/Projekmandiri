import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { query } from 'express';
import { get } from 'http';
import { retry } from 'rxjs';
import { LatihanService } from './latihan.service';

@Controller('latihan')
export class LatihanController {
  constructor(private readonly latihanService: LatihanService)
   {}
 
   ///

  @Get()
  findAll(@Query() query: any) {
    return this.latihanService.findAll(query);
  }

  @Get('detail/:id/:nama')
  detail(@Param('id') id: string, @Param('nama') nama: string) {
    return this.latihanService.findDetail(id, nama); 
  }

  @Post('simpan')
  register(@Body() payload: any) {
    return {
      method: 'GET',
      payload: payload,
    };
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      method: 'PUT',
      id: id,
      payload: payload,
    };
  }
  
}

//npm run start:dev = buat ngestart nest js

