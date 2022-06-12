import {
  ProductActionsTypes,
  ActionEvent,
} from './../../../../state/product.state';
import { Product } from '../../../../model/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css'],
})
export class ProductsItemComponent implements OnInit {
  @Input() product?: Product;

  @Output()
  productItemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  ngOnInit(): void {}

  onSelect(product: Product) {
    this.productItemEventEmitter.emit({
      type: ProductActionsTypes.SELECT_PRODUCTS,
      payload: product,
    });
  }

  onDelete(product: Product) {
    this.productItemEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCTS,
      payload: product,
    });
  }

  onEdit(product: Product) {
    this.productItemEventEmitter.emit({
      type: ProductActionsTypes.EDIT_PRODUCTS,
      payload: product,
    });
  }
}
