import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';

@Injectable()
export class TugasService {
  findAll(Query: any) {
      return {
          msg: "Succes",
          filter: {
              page: 1,
              page_size: 10
          }
      }
  }

  findDetail(id: string, status: string) {
      return {
         method: 'GET',
         id: id,
         status: status,
         msg: "Succes"
      }
  }

  register(payload: any) {
      return {
          status: 'success',
          msg: "berhasil disimpan",
          method: 'POST',
          payload: payload,
          name: "Nafisa",
          email: "nafisa@gmail.com",
          alamat_konsumen: "kp kebonjati rt.002",
          no_hp: "08123456789",
          
      }
  }
  delete(id){
      return {
          status: 'success',
          msg: `user dengan id ${id} berhasil di hapus `,        
      }
  }
}
