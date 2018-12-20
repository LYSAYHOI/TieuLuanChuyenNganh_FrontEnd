import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductService } from './../../services/get-product.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

	private productDetail: any;
	private a = {
		id: '123123132',
		name: 'asdasdasda'
	};
	private subscriptionParams : Subscription;
	private subscriptionGetProduct : Subscription;

	constructor(
		private getProductService : GetProductService,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.getParams();
	}

	ngOnDestroy() {
		if(this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
		if(this.subscriptionGetProduct)
			this.subscriptionGetProduct.unsubscribe();
	}

	getParams() {
		this.subscriptionParams = this.activatedRoute.params.subscribe(
			param => {
				let id = param['idProduct']
				this.getProductDetail(id);
			}
		)
	}

	getProductDetail(id) {
		this.subscriptionGetProduct = this.getProductService.getProductDetail(id).subscribe(
			data => {
				this.productDetail = data['object'];
				console.log(this.productDetail);
			},error => {
				console.log(error);
			}
		)
	}

}
