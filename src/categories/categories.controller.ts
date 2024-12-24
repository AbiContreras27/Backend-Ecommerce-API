import { Controller, Get, HttpCode, } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get('seeder')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add categories' })
  @ApiCreatedResponse({
    description: 'Add categories',
    schema: {
      example: {
        "message": "Categorias Agregadas"
      }
    }
  })
  addCategories() {
    return this.categoriesService.addCategories()
  }

  @Get()
  @ApiOperation({ summary: 'categories all list' })
  @ApiOkResponse({
    description: 'categories list',
    schema: {
      example: {
        "id": "ed97c853-0282-4458-891a-66d433cde07a",
        "name": "smartphone"
      }
    }
  })
  getCategories() {
    return this.categoriesService.getCategories()
  }
}