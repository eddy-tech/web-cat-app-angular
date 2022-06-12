import {
  ProductActionsTypes,
  ActionEvent,
} from './../../../state/product.state';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css'],
})
export class ProductsNavBarComponent implements OnInit {
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  onGetAllProducts() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_ALL_PRODUCTS,
    });
  }

  onGetSelectedProducts() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_SELECTED_PRODUCTS,
    });
  }

  onGetAvailableProducts() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS,
    });
  }

  onNewProducts() {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.NEW_PRODUCTS,
    });
  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({
      type: ProductActionsTypes.SEARCH_PRODUCTS,
      payload: dataForm,
    });
  }
}
