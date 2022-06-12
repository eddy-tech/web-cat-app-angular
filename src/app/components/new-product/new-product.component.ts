import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private prodService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //INITAILISER FORMBUILDER EN CREANT UN GROUPE DE CONTROLE
    this.productFormGroup = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(4)]), // LES VALEURS SERONT OBLIGATOIRES LORS DE LA MANIPULATION DU FORM
      price: this.fb.control('', Validators.required),
      quantity: this.fb.control('', Validators.required),
      selected: this.fb.control(false),
      available: this.fb.control(false, Validators.required),
    });
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.prodService
      .saveProduct(this.productFormGroup?.value)
      .subscribe((data) => {
        alert('Success Saving Product');
        this.router.navigateByUrl('/products');
      });
  }
}
