import { Controller, Get, Param, Post } from '@nestjs/common';
import { ShopingCartService } from './provider/shopinCart.service';
import { ShopingCartDto } from './dto/cart.dto';

@Controller('shoping-cart')
export class ShopingCartController {
  constructor(private readonly shopingCartService: ShopingCartService) {}
  @Get()
  public findAll() {
    return this.shopingCartService.findAll();
  }

  @Post('add-product/:productId/:userId/:quantity')
  public async addProductToCart(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
    @Param('quantity') quantity: number
  ) {
    const cart = await this.shopingCartService.addProductToCart(
      productId,
      userId,
      quantity
    );
    return new ShopingCartDto(cart);
  }

  // @Get('products/:userId')
  // public getProductsInCart(@Param('userId') userId: number) {
  //   return this.shopingCartService.getProductsInCart(userId);
  // }
}
