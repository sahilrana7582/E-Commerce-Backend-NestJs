import { CartItem } from '../entity/cartItem.entity';
import { ShopingCart } from '../entity/shopingCart.entity';

export class CartItemDto {
  id: number;
  productId: number | null; // Allow productId to be null
  quantity: number;
  price: number;

  constructor(cartItem: CartItem) {
    this.id = cartItem.id;
    this.productId = cartItem.product ? cartItem.product.id : null; // Check if product exists
    this.quantity = cartItem.quantity;
    this.price = cartItem.price;
  }
}

export class ShopingCartDto {
  id: number;
  userId: number | null;
  cartItems: CartItemDto[];
  quantity: number;
  totalPrice: number;
  constructor(shopingCart: ShopingCart) {
    this.id = shopingCart.id;
    this.userId = shopingCart.user ? shopingCart.user.id : null; // Check if user exists
    this.cartItems = shopingCart.cartItems.map((item) => new CartItemDto(item));
    this.quantity = shopingCart.quantity;
    this.totalPrice = shopingCart.totalPrice;
  }
}
