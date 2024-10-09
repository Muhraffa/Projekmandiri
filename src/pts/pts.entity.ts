import { BaseEntity, Entity, Column,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  tempat_lahir: string;

  @Column()
  tanggal_lahir: string;

  @Column()
  nik: string;

  @Column()
  nisn: string;

  @Column()
  alamat: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  updated_at: Date;
}





