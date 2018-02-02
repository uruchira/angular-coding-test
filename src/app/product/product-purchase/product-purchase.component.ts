import { Component, OnInit } from '@angular/core';

import { ICart } from '../../product/cart';
import { CartService } from '../cart.service'

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html'
})

export class ProductPurchaseComponent implements OnInit {

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this._cartService.removeAllFromCart();
  }
}
