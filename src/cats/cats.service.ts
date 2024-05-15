import { Injectable, NotFoundException } from '@nestjs/common';
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
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException("We don't have a cat with that id", {
        cause: new Error(),
        description: 'BAD REQUEST',
      });
    }
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
