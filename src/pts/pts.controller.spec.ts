import { Test, TestingModule } from '@nestjs/testing';
import { PtsController } from './pts.controller';

describe('PtsController', () => {
  let controller: PtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PtsController],
    }).compile();

    controller = module.get<PtsController>(PtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
