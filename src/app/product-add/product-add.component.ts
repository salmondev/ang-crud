import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {

  product: Product = new Product();
  submitted = false;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {

  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save() {
    this.apiService.createProduct(this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.product = new Product();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.apiService.getProductsList();
    this.router.navigate(['/products']);
  }

}

