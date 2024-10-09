import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Search,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import { retry } from 'rxjs';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response.ultis'; //BaseResponse from 'src/utils/response.ultis';
import { createBookDto, findBookDto } from './book.dto';

@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
    super();
  }

  // disini kita akan membuat api untuk mengakses semua data di tabel book

  async findAllBook(query: findBookDto): Promise<ResponsePagination> {
    console.log('query', query);
    const {
      page,
      PageSize,
      limit,
      title,
      author,
      deskripsi,
      from_year,
      to_year,
      keyword,
    } = query;

    const filter: {
      [key: string]: any;
    } = {};

    const search: { [key: string]: any }[] = [];

    if (keyword) {
      search.push(
        { title: Like(`%${keyword}%`) },
        {
          author: Like(`%${keyword}%`),
        },

        {
          deskripsi: Like(`%${keyword}%`),
        },
      );
    } else {
      if (title) {
        filter.title = Like(`%${title}%`);
      }

      if (author) {
        filter.author = Like(`%${author}%`);
      }

      if (deskripsi) {
        filter.deskripsi = Like(`%${deskripsi}%`);
      }

      if (from_year && to_year) {
        filter.year = Between(from_year, to_year);
      }

      if (from_year && !to_year) {
        filter.year = Between(from_year, from_year);
      }
    }

    console.log('filter', filter);

    console.log('search', search);

    const total = await this.bookRepository.count();

    const result = await this.bookRepository.find({
      where: keyword ? search : filter,
      skip: limit,
      take: Number(PageSize),
    });

    return this._pagination('okeh', result, total, page, PageSize);

    // return  {
    //   status: 'success',
    //   message: 'list buku ditemukan',
    //   data: save,
    // };
  }

  async detail(id: number): Promise<ResponseSuccess> {
    const result = await this.bookRepository.findOne({
      where: { id: id },
    });

    if (result === null) {
      throw new NotFoundException('buku gk ada');
    }

    return {
      status: 'success',
      message: 'list buku ditemukan',
      data: result,
    };
  }

  // menambah buku

  async create(payload: createBookDto): Promise<ResponseSuccess> {
    try {
      const save = await this.bookRepository.save(payload);

      return {
        status: 'success',
        message: 'buku ditambahkan',
      };
    } catch (error) {
      throw new HttpException('masih salah!', HttpStatus.BAD_REQUEST);
    } finally {
      console.log('berhasil disimpan');
    }

    // detail book
  }

  async update(id: number, payload: any): Promise<ResponseSuccess> {
    try {
      // const result = await this.bookRepository.save({
      //   title: payload.title,
      //   year: payload.year,
      //   author: payload.author,
      //   id: id,
      // });
      const result = await this.bookRepository.update(
        {
          id: id,
        },
        {
          title: payload.title,
          year: payload.year, // ini semua yg mau di update
          author: payload.author,
          id: id,
        },
      );

      return {
        status: 'success',
        message: 'buku di update',
        data: result,
      };
    } catch {
      throw new HttpException('salah nih', HttpStatus.BAD_REQUEST);
    }

    // delete book
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const deleted = await this.bookRepository.delete(id);
    return {
      status: 'success',
      message: 'buku di hapus',
    };
  }

  async deletemulti(array: string[]): Promise<ResponseSuccess> {
    const deleted = await this.bookRepository.delete(array);

    if (deleted.affected === 0) {
      throw new HttpException('buku gk ada', HttpStatus.BAD_REQUEST);
    }
    return {
      status: 'success',
      message: `buku ${deleted.affected} di hapus`,
      data: deleted,
    };
  }

  
}
