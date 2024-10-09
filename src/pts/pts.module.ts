import { Module } from '@nestjs/common';
import { PtsController } from './pts.controller';
import { ptsService } from './pts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { create } from 'domain';
import { Pts } from './pts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pts])],
  controllers: [PtsController],
  providers: [ ptsService],
})
export class PtsModule {}
