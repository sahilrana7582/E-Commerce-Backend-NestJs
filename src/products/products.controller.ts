import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './providers/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  public findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
