import { Body, Controller, Get, Post } from '@nestjs/common';
import { proyekService } from './proyek.service';

@Controller('proyek')
export class ProyekController {
    constructor(private readonly proyekService: proyekService) {}
  @Get()
  findAll() {
    return this.proyekService.findAll();
  }
}
