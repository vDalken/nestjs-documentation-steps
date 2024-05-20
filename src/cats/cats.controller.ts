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
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateCatDto } from './dtos/create-cat.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/exclude-null-operator.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {} //dependency injection

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  @UseFilters(new HttpExceptionFilter())
  @Roles(['admin'])
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
