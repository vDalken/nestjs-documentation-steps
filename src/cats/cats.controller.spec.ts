import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatInterface } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = moduleRef.get<CatsController>(CatsController);
    catsService = moduleRef.get<CatsService>(CatsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: CatInterface[] = [
        {
          id: 0,
          name: 'test',
          age: 8,
          breed: 'french',
        },
      ];
      jest
        .spyOn(catsService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(await catsController.findAll()).toBe(result);
    });
  });
});
