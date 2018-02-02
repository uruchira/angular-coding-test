import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductPurchaseComponent } from './product-purchase/product-purchase.component';

import { ProductService } from './product.service';
import { CartService } from './cart.service';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ProductListComponent, 
    ProductDetailComponent, 
    ProductCartComponent, 
    ProductPurchaseComponent
  ],
  providers: [
    ProductService,
    CartService
  ]
})
export class ProductModule { }
