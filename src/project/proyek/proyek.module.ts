import { Module } from '@nestjs/common';
import { ProyekController } from './proyek.controller';
import { proyekService } from './proyek.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './proyel.entitiy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [ProyekController],
  providers: [proyekService]
})
export class ProyekModule {
  
}

