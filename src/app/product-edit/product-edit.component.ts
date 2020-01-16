import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from 'app/product';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {


  id: number;
  product: Product;
  price: number;

  constructor(private route: ActivatedRoute, private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    this.product = new Product();

    this.id = this.route.snapshot.params.id;

    this.apiService.getProduct(this.id)
      .subscribe(data => {
        console.log(data);
        this.product = data;
      }, error => console.log(error));
  }

  updateProduct() {
    this.apiService.updateProduct(this.id, this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.product = new Product();
    this.gotoList();
  }

  onSubmit() {
    this.updateProduct();
  }

  gotoList() {
    this.router.navigate(['/product']);
  }

}
