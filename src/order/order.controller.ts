import { Controller, Post, Body, UseGuards, Req, ParseIntPipe, Param, Get, Delete } from '@nestjs/common';
import { OrderService } from './provider/order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId')
  createOrder(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() order: CreateOrderDto
  ) {
    return this.orderService.createOrder(userId, order);
  }

  @Get()
  public getOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  public getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Delete(':id')
  public deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
