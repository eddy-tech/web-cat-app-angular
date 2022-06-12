import { ProductActionsTypes, ActionEvent } from './../../state/product.state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products$: Observable<AppDataState<Product[]>> | null = null;

  readonly dataStateEnum = DataStateEnum;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map((data) => ({
        dataState: DataStateEnum.LOADER,
        data: data,
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => {
        return {
          dataState: DataStateEnum.LOADER,
          data: data,
        };
      }),
      startWith({
        dataState: DataStateEnum.LOADING,
      }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map((data) => {
        return {
          dataState: DataStateEnum.LOADER,
          data: data,
        };
      }),
      startWith({
        dataState: DataStateEnum.LOADING,
      }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  onSearch(dataSearch: any) {
    this.products$ = this.productService
      .searchProducts(dataSearch.keyword)
      .pipe(
        map((data) => {
          console.log(data);
          return {
            dataState: DataStateEnum.LOADER,
            data: data,
          };
        }),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError((err) =>
          of({
            dataState: DataStateEnum.ERROR,
            errorMessage: err.message,
          })
        )
      );
  }

  onSelect(p: Product) {
    this.productService.select(p).subscribe(
      ((data) => {
        p.selected = data.selected;
      }),
      (err) => {
        console.log(err);
      }
    );
  }

  onDelete(p: Product) {
    let v = confirm('Etes vous sure ?');

    if (v == true)
      this.productService.deleteProduct(p).subscribe(
        (data) => {
          this.onGetAllProducts();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNewProducts() {
    this.router.navigateByUrl('/newProduct');
  }

  onEdit(p: Product) {
    this.router.navigateByUrl('/editProduct/' + p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
      case ProductActionsTypes.NEW_PRODUCTS:
        this.onNewProducts();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;
      case ProductActionsTypes.SELECT_PRODUCTS:
        this.onSelect($event.payload);
        break;
      case ProductActionsTypes.DELETE_PRODUCTS:
        this.onDelete($event.payload);
        break;
      case ProductActionsTypes.EDIT_PRODUCTS:
        this.onEdit($event.payload);
        break;
    }
  }
}
