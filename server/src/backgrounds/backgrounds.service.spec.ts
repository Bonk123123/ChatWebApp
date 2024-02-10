import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundsService } from './backgrounds.service';

describe('BackgroundsService', () => {
  let service: BackgroundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundsService],
    }).compile();

    service = module.get<BackgroundsService>(BackgroundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
