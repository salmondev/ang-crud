import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: Product;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.product = new Product();

    this.id = this.route.snapshot.params.id;

    this.apiService.getProduct(this.id)
      .subscribe(data => {
        console.log(data);
        this.product = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['products']);
  }

}
