import { Controller, Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@Put()
update(){
  return "ini method update";
}

@Post()
create(): string {
  return "OK";
}

@Post('tes')
create2(): string {
  return "tes";
}
  
  @Get()
  getHello(): string {
    return "belajar nest js";
  }

  @Get()
  getHello2(): string {
    return "belajar nest js"
  }
}

//  susuna ngerun nest js module, service dan controller yg penting module harus duluan