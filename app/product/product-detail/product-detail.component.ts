import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from '../product';
import { ICart } from '../cart';

import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {
  product: IProduct;
  cartItem: ICart;
  qty: number = 1;
  totalPrice: number;
  outOfStock: boolean = false; 
  isOutOfStockErrMsg: string;
  getProductErrMsg: string;
  isNewProductErrMsg: string;
  isLoading = true;
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute, 
    private _productService: ProductService,
    private _cartService: CartService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.getProduct(param);
    }
  }

  getProduct(name: string) {
    this._productService.getProduct(name).subscribe(
      product => {
        this.product = product;
        this.isLoading = false;
      },
      error => this.getProductErrMsg = <any>error
    );
  }

  addToCart(product: IProduct) {
    this.cartItem = <ICart>{name: this.product.name, price: this.product.price, 
                        qty: this.qty, stock: this.product.stock};
    const duplicates = this._cartService.isNew(this.cartItem);
    if(duplicates.length) {
      this.isNewProductErrMsg = "This product is already in your shopping cart";
    }
    else {
      this.isNewProductErrMsg = "";
      this._cartService.addToCart(this.cartItem);
      this._router.navigateByUrl('/products/cart');
    }
  }

  updateItemQty(event) {
    const newQty = event.target.value;
    this.qty = newQty;
    if(newQty > this.product.stock) {
      this.outOfStock = true;
      this.totalPrice = 0;
      this.isOutOfStockErrMsg = `The quantity entered can't exceed ${this.product.stock}`;
    } else {
      this.outOfStock = false;
      this.totalPrice = newQty * this.product.price;
      this.isOutOfStockErrMsg = "";
    }
  }
}