import { IsInt, IsNotEmpty, IsOptional, Length } from "class-validator";

export class PtsDto {

    @IsOptional()
    id: number;

    @IsOptional()
    @Length(5, 100 , {message: "nama minimal 5 nyampe 100"})
    nama: string;

    // @Length(5, 100 , {message: "email minimal 5 nyampe 100"})
    email: string;

    // @IsNotEmpty({message : "tempat lahir wajib diisi"})
    @Length(5, 100 , {message: "tempat lahir minimal 5 nyampe 100"})
    tempat_lahir: string;

    @IsNotEmpty({message : "tanggal lahir wajib diisi"})
    @Length(5, 100 , {message: "tempat lahir minimal 5 nyampe 100"})
    tanggal_lahir: string;

    @IsOptional()
    @Length(5, 100 , {message: "nik minimal 5 nyampe 100"})
    nisn: string;

    @IsOptional()
    @Length(5, 100 , {message: "nik minimal 5 nyampe 100"})
    nik: string;

    @IsOptional()
    @Length(5, 100 , {message: "alamat minimal 5 nyampe 100"})
    alamat: string;
    
}
