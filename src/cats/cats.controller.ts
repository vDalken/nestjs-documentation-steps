import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseFilters,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateCatDto } from './dtos/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {} //dependency injection

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
