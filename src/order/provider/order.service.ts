import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
import { Address } from 'src/address/entity/address.entity';
import { User } from 'src/users/entity/users.entity';
import { Product } from 'src/products/entity/product.entity';
import { UserProfile } from 'src/userprofile/entity/user-profile.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly dataSource: DataSource
  ) {}

  public async createOrder(userId: number, orderDto: CreateOrderDto) {
    const { items } = orderDto;
    const queryRunner = this.dataSource.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Fetch user profile and address
      const userProfile = await this.userProfileRepository.findOne({
        where: { user: { id: userId } },
        relations: ['address', 'user'],
      });
  
      if (!userProfile) {
        throw new Error('User profile not found');
      }
  
      if (!userProfile.address) {
        throw new Error('Address not found');
      }
  
      let totalAmount = 0;
      const orderItems: OrderItem[] = [];
  
      // Fetch products and create order items
      for (const item of items) {
        const product = await queryRunner.manager.findOne(Product, {
          where: { id: item.productId },
        });
  
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
  
        totalAmount += product.price * item.quantity;
  
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.quantity = item.quantity;
        orderItem.price = Number(product.price);
        
        // Save each order item individually
        await queryRunner.manager.save(orderItem);
        
        orderItems.push(orderItem);
      }

      const address = await this.addressRepository.findOne({
        where: { id: userProfile.address.id },
      });
      
      if (!address) {
        throw new NotFoundException('Address not found');
      }
  
      // Create the order
      const order = new Order();
      order.user = userProfile.user;
      order.address = address;
      order.totalAmount = totalAmount;
      order.items = orderItems;
  
      // Save the order
      await queryRunner.manager.save(order);
  
      // Commit the transaction
      await queryRunner.commitTransaction();
  
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async getOrders() {
    return this.orderRepository.find();
  }

  public async getOrderById(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }

  public async deleteOrder(id: number) {
    return this.orderRepository.delete(id);
  }
}
