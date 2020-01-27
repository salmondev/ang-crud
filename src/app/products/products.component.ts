import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import Swal from 'sweetalert2';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products: Observable<Product[]>;


  constructor(private apiService: ApiService,
              private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.reloadData();
    /*this.http.get('http://localhost:8080/products/').subscribe(data => {
      // อ่านค่า result จาก JSON response ที่ส่งออกมา
      this.products = data['products'];
    });*/
  }

  reloadData() {
    this.products = this.apiService.getProductsList();
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Comfirm to delete data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Product data has been deleted.',
          'success'
        );
        this.apiService.deleteProduct(id)
          .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
      }
    });
    // default
    /*this.apiService.deleteProduct(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));*/
  }

  productDetail(id: string) {
    this.router.navigate(['product-details', id]);
  }

  updateProduct(id: string) {
    this.router.navigate(['product-edit', id]);
  }

}
