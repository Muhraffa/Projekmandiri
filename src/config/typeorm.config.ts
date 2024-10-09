import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrm: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3308, 
  username: process.env.DB_USERNAME || "root", 
  password: process.env.DB_PASSWORD|| "root",
  database: process.env.DB_DATABASE || "nest_js_2024",
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
  logging: true,
};

