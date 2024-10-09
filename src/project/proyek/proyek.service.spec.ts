import { Test, TestingModule } from '@nestjs/testing';
import { proyekService } from './proyek.service';

describe('ProyekService', () => {
  let service: proyekService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [proyekService],
    }).compile();

    service = module.get<proyekService>(proyekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
