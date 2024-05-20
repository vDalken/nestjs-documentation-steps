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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatInterface } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateCatDto } from './dtos/create-cat.dto';
import { RolesGuard } from '../guards/roles.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/exclude-null-operator.interceptor';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    @InjectRepository(Cat) private catsRepository: Repository<Cat>,
  ) {} //dependency injection

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  @UseFilters(new HttpExceptionFilter())
  //roles @Roles(['admin'])
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CatInterface> {
    return this.catsService.findOne(id);
  }

  @Get()
  async findAll(): Promise<CatInterface[]> {
    return this.catsService.findAll();
  }
}
