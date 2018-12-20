import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetProductService } from './../../../services/get-product.service';
@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent implements OnInit {

	private products1: any[] = [];
	private arr = [1,2,3,4];

	constructor(
		private getProductService: GetProductService
	) { }

	ngOnInit() {
		this.loadCategoryList();
	}

	loadCategoryList() {
		this.getProductService.getProductByCategory('1').subscribe(
			data => { 
				this.products1 = data['object'];
				console.log(this.products1);
			},
			error => { console.log(error);}
		);
	}

	ngOnDestroy(){

	}

}
