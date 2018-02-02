import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[];
  errorMessage: string;
  isLoading = true;

  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProducts()
    .subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
          product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}