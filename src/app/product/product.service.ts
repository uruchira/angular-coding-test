import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
  private _productUrl = 'http://cat-store-api.frostdigital.se/api';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any> {
    return this._http.get(this._productUrl)
        .map(data => data['products'])
        .catch(this.handleError);
  }

  getProduct(name: string): Observable<IProduct> {
    return this.getProducts()
        .map((products: IProduct[]) => products.find(p => p.name === name));
  }

  private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return Observable.throw(errorMessage);
  }
}