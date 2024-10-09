import { Test, TestingModule } from '@nestjs/testing';
import { ptsService } from './pts.service';
import { create } from 'domain';

describe('ptsService', () => {
  let service: ptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ptsService],
    }).compile();

    service = module.get<ptsService>(ptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
