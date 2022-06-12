import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productId = activatedRoute.snapshot.params['id'];
    // console.log(activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe((product) => {
      this.productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected],
        available: [product.available, Validators.required],
      });
    });
  }

  onUpdateProduct() {
    this.productService
      .updateProduct(this.productFormGroup?.value)
      .subscribe((data) => {
        alert('Succès Product updated');
        this.router.navigateByUrl('/products');
      });
  }
}
