import { Controller, Get, Param, Post, Query, Body, Delete } from '@nestjs/common';
import { filter } from 'rxjs';
import { TugasService } from './tugas.service';

@Controller('tugas')
export class TugasController {
    constructor(private readonly tugasService: TugasService) {}
    //soal 1

    @Get()

    findAll(@Query() Query:any) {
        return this.tugasService.findAll(Query);
    }

    //soal 2

    @Get ('detail/:id/:status')
    detail(@Param('id') id: string, @Param('status') status: string){
        return this.tugasService.findDetail(id, status);
    }

    //soal 3

    @Post('simpan')
    register(@Body() payload: any){
        return{
            method: 'POST',
            payload: payload
        };
    }

    //soal 4
    @Delete(":id/delete")
    delete(@Param('id') id: string){
        return this.tugasService.delete(id);
    }

    // @Get('detail1/id/:id')
    // detail1(@Param('id') id: string, @Param('status') status: string){
    //  return this.tugasService.findDetail(id, status);
    // }
}
