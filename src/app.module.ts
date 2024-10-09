import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LatihanModule } from './latihan/latihan.module';
import { TugasModule } from './tugas/tugas.module';
 import { ConfigModule } from '@nestjs/config';
 import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { PtsModule } from './pts/pts.module';
import { ProyekController } from './project/proyek/proyek.controller';
import { ProyekModule } from './project/proyek/proyek.module';
import { proyekService } from './project/proyek/proyek.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, }),
     TypeOrmModule.forRootAsync({
        useFactory: async () => {
          const {typeOrm} = await import('./config/typeorm.config');
          return typeOrm;
        },
          
      }), 
      
      LatihanModule, TugasModule, BookModule, PtsModule, ProyekModule],
  controllers: [AppController, ProyekController],
  providers: [AppService, proyekService],
})
export class AppModule {}
