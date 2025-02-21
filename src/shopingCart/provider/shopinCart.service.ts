import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopingCart } from '../entity/shopingCart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/providers/products.service';
import { UsersService } from 'src/users/provider/users.service';
import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/users.entity';
import { CartItem } from '../entity/cartItem.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ShopingCartService {
  constructor(
    @InjectRepository(ShopingCart)
    private readonly shopingCartResp: Repository<ShopingCart>,
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
    @InjectRepository(CartItem)
    private readonly cartItemResp: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productResp: Repository<Product>,
    @InjectRepository(User)
    private readonly userResp: Repository<User>
  ) {}
  public findAll() {
    return this.shopingCartResp.find();
  }

  public async addProductToCart(
    productId: number,
    userId: number, 
    quantity: number
  ) {
    const product: Product | null = await this.productResp.findOne({
      where: { id: productId },
    });

    const user: User | null = await this.userResp.findOne({
      where: { id: userId },
      relations: ['shopingCart'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let shopingCart: ShopingCart | null = user.shopingCart;

    if (!shopingCart) {
      shopingCart = new ShopingCart();
      shopingCart.user = user;
      shopingCart.cartItems = [];
      shopingCart.quantity = 0; // Initialize cart quantity
      shopingCart.totalPrice = 0; // Initialize total price
      shopingCart = await this.shopingCartResp.save(shopingCart);
    }

    let cartItem: CartItem | null = await this.cartItemResp.findOne({
      where: { product, shopingCart },
    });

    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.price = Number(product.price) * cartItem.quantity;
      await this.cartItemResp.save(cartItem);
    } else {
      cartItem = new CartItem();
      cartItem.product = product;
      cartItem.shopingCart = shopingCart;
      cartItem.quantity = 1;
      cartItem.price = Number(product.price);
      await this.cartItemResp.save(cartItem);

      if (!shopingCart.cartItems) {
        shopingCart.cartItems = [];
      }
      shopingCart.cartItems.push(cartItem);
    }

    shopingCart.quantity = shopingCart.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const totalPrice = shopingCart.cartItems.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );
    shopingCart.totalPrice = parseFloat(totalPrice.toFixed(2));

    console.log(`Total Price: ${shopingCart.totalPrice}`);

    return this.shopingCartResp.save(shopingCart);
  }
}
