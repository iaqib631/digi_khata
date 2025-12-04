import { Test, TestingModule } from '@nestjs/testing';
import { BenificiaryController } from './benificiary.controller';

describe('BenificiaryController', () => {
  let controller: BenificiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenificiaryController],
    }).compile();

    controller = module.get<BenificiaryController>(BenificiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
