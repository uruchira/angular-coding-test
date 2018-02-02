import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

import { ICart } from '../../product/cart';
import { CartService } from '../cart.service'

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html'
})

export class ProductCartComponent implements OnInit {
  shoppingCartItems$: Observable<ICart[]> = of([]);
  shoppingCartItems: ICart[] = [];
  isQtyExceed: boolean = false;
  qtyExceedErrMsg: string;
  total: number;

  constructor(private _cartService: CartService, private _router: Router) {}

  ngOnInit() {
    this.shoppingCartItems$ = this._cartService.getItems();
    this.shoppingCartItems$.subscribe(items => this.shoppingCartItems = items);
    this.getTotal().subscribe(total => this.total = total);
  }

  getTotal(): Observable<number> {
    return this._cartService.getTotalAmount();
  }

  removeItem(item: ICart) {
    this._cartService.removeFromCart(item);
  }

  updateQty(event, item: ICart) {
    const newQty = event.target.value; 
    if(newQty > item.stock) {
      this.isQtyExceed = true;
      this.qtyExceedErrMsg= `The quantity entered can't exceed ${item.stock}`;
    } else {
      this.isQtyExceed = false;
      this.qtyExceedErrMsg= '';
      item.qty = +newQty;
      this._cartService.updateCartItem(item);
      this.getTotal().subscribe(total => this.total = total);
    }
  }

  makePurchase(): void {
    this._router.navigate(['/products/purchase']);
  }
}