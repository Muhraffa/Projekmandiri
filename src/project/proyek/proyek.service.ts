import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import BaseResponse from "src/utils/response.ultis";
import { User } from "./proyel.entitiy";
import { RegisterDto } from "../proyek.dto";
import { ResponseSuccess } from "src/interface/response.interface";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class proyekService extends BaseResponse {
  findAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private jwtService:JwtService
  ) {
    super();
  }

  async register(payload: RegisterDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (checkUserExists) {
      throw new HttpException("Berhasil masuk", HttpStatus.FOUND);
    }

    payload.password = await hash(payload.password, 12); //hash password
    await this.authRepository.save(payload);

    return this._succes("Register Berhasil");
  }
}