import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { ICart } from '../product/cart';

@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<ICart[]> = new BehaviorSubject([]);
  private itemsInCart: ICart[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(itemsInCart => this.itemsInCart = itemsInCart);
  }

  public isNew(item: ICart) {
    const currentItems = [...this.itemsInCart];
    const itemDuplicated = currentItems.filter(cartItem => cartItem.name === item.name);
    return itemDuplicated;
  }

  public getItems(): Observable<ICart[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: ICart[]) => {
      return items.reduce((prev, curr: ICart) => {
        return prev + (curr.price * curr.qty);
      }, 0);
    });
  }

  public addToCart(item: ICart) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public removeFromCart(item: ICart) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(cartItem => cartItem.name !== item.name);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public removeAllFromCart() {
    const currentItems = [];
    this.itemsInCartSubject.next(currentItems);
  }

  public updateCartItem(updatedtem: ICart) {
    const currentItems = [...this.itemsInCart];
    const item = currentItems.find(cartItem => cartItem.name === updatedtem.name);
    currentItems[currentItems.indexOf(item)] = updatedtem;
    this.itemsInCartSubject.next(currentItems);
  }
}