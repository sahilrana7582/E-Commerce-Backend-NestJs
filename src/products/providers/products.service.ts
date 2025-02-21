import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { validateOrReject } from 'class-validator';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectDataSource()
    private readonly dataSource: DataSource
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

  public async create(product: CreateProductDto) {
    await validateOrReject(product);
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  public async update(id: number, product: UpdateProductDto) {
    await validateOrReject(product);
    const updatedProduct: UpdateResult = await this.productRepository.update(
      id,
      product
    );
    if (updatedProduct.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  public async delete(id: number) {
    const deletedProduct = await this.productRepository.delete(id);
    if (deletedProduct.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product deleted successfully',
    };
  }

  public async createMany(products: CreateProductDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const result: Product[] = [];

      for (const product of products) {
        const newProduct = this.productRepository.create(product);
        await queryRunner.manager.save(Product, newProduct);
        result.push(newProduct);
      }

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
