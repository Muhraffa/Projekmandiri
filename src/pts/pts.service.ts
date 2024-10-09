import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pts } from '../pts/pts.entity';
import { ResponseSuccess } from 'src/interface';
import { promises } from 'dns';
import { error } from 'console';
import { PtsDto } from './pts.dto';
import BaseResponse from 'src/utils/response.ultis';
import { totalmem } from 'os';

@Injectable()
export class ptsService extends BaseResponse {
  succes: BaseResponse | PromiseLike<BaseResponse>;
  list() {
    throw new Error('Method not implemented.');
  }         
  constructor(
    @InjectRepository(Pts) private readonly Repository: Repository<Pts>,
  ) {
    super();
  }

  async create(payload:PtsDto): Promise<BaseResponse> {
    try {
      const newUser = await this.Repository.save(payload);
  
      const existingUser = await this.Repository.findOne({
        where: { email: payload.email },
      });

     


      return this.succes
    } catch (error) {
  if(error){
    throw new HttpException(
      "Email sudah digunakan",
       422
   );

  }
     
}}
  async findAll() {
  const data = await this.Repository.find();
  return this._pagination('OK',  data, data.length, 1, 10);
  
  }

  

  async update(id: number, payload: any) {
    const data2 = await this.Repository.findOne({ where: { id } });
   const data = await this.Repository.update(id, payload);
  
    return this._succes(
      'OK',
      data2
    )

  }

  async find(id: number) {
    const siswa = await this.Repository.findOne({ where: { id } });
    if (!siswa) {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message: 'id siswa tidak ada',
      }, HttpStatus.NOT_FOUND);
    }

    return this._succes('OK', siswa);

  
   
  }

}

