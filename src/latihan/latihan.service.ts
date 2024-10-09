import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class LatihanService {
    findAll(query: any) {
        return {
            msg: "Siap latihan Service",
            Params: query
        };
    }

    findDetail(id:string, nama: string){
        return{
            method: 'GET',
            id: id,
            nama: nama

        }
    }

    register(payload: any){
        return{
            method: 'POST',
            payload: payload}
    }
    
}
