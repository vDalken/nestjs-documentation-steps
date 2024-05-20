import { BadRequestException, Injectable } from '@nestjs/common';
import { CatInterface } from './interfaces/cat.interface';
import { CreateCatDto } from './dtos/create-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  async create(cat: CreateCatDto): Promise<CatInterface> {
    const newCat: CatInterface = {
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    };

    const savedCat = await this.catsRepository.save(newCat);

    return savedCat;
  }

  async findOne(id: number): Promise<CatInterface> {
    const cat: CatInterface | null = await this.catsRepository.findOneBy({
      id,
    });
    if (cat) {
      return cat;
    }
    throw new BadRequestException('no cat found');
  }

  async findAll(): Promise<CatInterface[]> {
    const cats: Cat[] = await this.catsRepository.find();
    return cats.map((cat) => ({
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    }));
  }
}
