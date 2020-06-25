import { Test, TestingModule } from '@nestjs/testing';
import { PreorderController } from './preorder.controller';

describe('Preorder Controller', () => {
  let controller: PreorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreorderController],
    }).compile();

    controller = module.get<PreorderController>(PreorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
