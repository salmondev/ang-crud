import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from '../product';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})

export class ProductEditComponent implements OnInit {


  id: string;
  product: Product;
  price: number;
  submitted = false;

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
    Swal.fire({
      icon: 'success',
      title: 'Product has been updated.',
      showConfirmButton: false,
      timer: 1500
    });
    this.submitted = true;
    this.updateProduct();
  }

  gotoList() {
    this.router.navigate(['/products']);
  }

}
