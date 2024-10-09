import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { basename } from 'path';
import { Repository } from 'typeorm';
import { User } from '../auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { hash } from 'bcrypt';
import { compare } from 'bcrypt';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response.ultis';

@Injectable()
export class AuthService extends BaseResponse {
  [x: string]: any;
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super();
  }


  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  } //membuat method untuk generate jwt

  async register(payload: RegisterDto): Promise<ResponseSuccess> {
    // cek dulu email sudah ada atau engak
    const CheckUserExist = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (CheckUserExist) {
      throw new HttpException('email sudah terdaftar', HttpStatus.FOUND);
    }

    // hash password
    payload.password = await hash(payload.password, 12);
    //hash password
    await this.authRepository.save(payload);
    return this._success('register Berhasil');
  }
  async login(payload: LoginDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        password: true,
        refresh_token: true,
      },
    });

    if (!checkUserExists) {
      throw new HttpException(
        'User tidak ditemukan',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

   


    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    ); // compare password yang dikirim dengan password yang ada di tabel
    if (checkPassword) {

     const jwtPayload : jwtPayload = {
      id: checkUserExists.id,
      nama: checkUserExists.nama,
      email: checkUserExists.email,
     }

      const access_token = await this.generateJWT(
        jwtPayload, '1d', process.env.ACCESS_TOKEN_SECRET
      );

      return this._success('Login Success', {
        ... checkUserExists, access_token
      });
    } else {
      throw new HttpException(
        'email dan password tidak sama',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

 
}
