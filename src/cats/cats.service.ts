import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dtos/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    const newCat: Cat = {
      id: this.cats.length,
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    };
    this.cats.push(newCat);
  }

  findOne(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
