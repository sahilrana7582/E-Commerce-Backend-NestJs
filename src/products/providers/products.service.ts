import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  public findAll() {
    return this.productRepository.find();
  }

  public async findOne(id: number) {
    const product: Product | null = await this.productRepository.findOneBy({
      id,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
