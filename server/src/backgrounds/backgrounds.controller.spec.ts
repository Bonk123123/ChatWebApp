import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundsController } from './backgrounds.controller';
import { BackgroundsService } from './backgrounds.service';

describe('BackgroundsController', () => {
  let controller: BackgroundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackgroundsController],
      providers: [BackgroundsService],
    }).compile();

    controller = module.get<BackgroundsController>(BackgroundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
