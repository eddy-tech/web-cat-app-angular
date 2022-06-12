import {
  ActionEvent,
  ProductActionsTypes,
} from './../../../state/product.state';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input()
  productsInput$: Observable<AppDataState<Product[]>> | null = null;

  @Output()
  productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  readonly dataStateEnum = DataStateEnum;

  constructor() {}

  ngOnInit(): void {}

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
}
