import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  //REQUETE POUR RETOURNER UN TABLEAU DE PRODUITS
  public getAllProducts(): Observable<Product[]> {
    let host = environment.host;
    // Math.random() > 0.1 ? environment.host : environment.unreachableHost;
    return this.httpClient.get<Product[]>(host + '/products');
  }

  public getSelectedProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.httpClient.get<Product[]>(host + '/products?selected=true');
  }

  public getAvailableProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.httpClient.get<Product[]>(host + '/products?available=true');
  }

  public searchProducts(keyword: string): Observable<Product[]> {
    let host = environment.host;
    return this.httpClient.get<Product[]>(
      host + '/products?name_like=' + keyword
    );
  }
  public select(product: Product): Observable<Product> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.httpClient.put<Product>(
      host + '/products/' + product.id,
      product
    );
  }

  public deleteProduct(product: Product): Observable<void> {
    let host = environment.host;
    return this.httpClient.delete<void>(host + '/products/' + product.id);
  }

  public saveProduct(product: Product): Observable<Product> {
    let host = environment.host;
    return this.httpClient.post<Product>(host + '/products', product);
  }

  public getProductById(id: number): Observable<Product> {
    let host = environment.host;
    return this.httpClient.get<Product>(host + '/products/' + id);
  }

  public updateProduct(product: Product): Observable<Product> {
    let host = environment.host;
    return this.httpClient.put<Product>(
      host + '/products/' + product.id,
      product
    );
  }
}
