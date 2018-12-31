import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductService } from './../../services/get-product.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

	private productDetail: any;
	private subscriptionParams : Subscription;
	private subscriptionGetProduct : Subscription;

	constructor(
		private getProductService : GetProductService,
		private cookieService: CookieService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private toastrService: ToastrService
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
			},error => {
				console.log(error);
			}
		)
	}

	addToCart() {
		if(!this.cookieService.check('token')){
			this.router.navigate(['/login']);
			return;
		}
		if(this.cookieService.check('cart')){
			let productListIndex = this.productDetail;
			let cookie: any[] = JSON.parse(this.cookieService.get('cart'));
			for(var i in cookie){
				if(cookie[i]['productDTO']['idProduct'] == this.productDetail['idProduct']){
					cookie[i]['quantity'] = cookie[i]['quantity'] + 1;
					this.cookieService.set('cart', JSON.stringify(cookie));
					return;
				}
			}
			let item = {
				quantity: 1,
				productDTO: this.productDetail
			}
			cookie.push(item);
			this.cookieService.set('cart', JSON.stringify(cookie));
			this.showSuccess();
		} else {
			let arr : any[] = [];
			let item = {
				quantity: 1,
				productDTO: this.productDetail
			}
			arr.push(item);
			this.cookieService.set('cart', JSON.stringify(arr))
			this.showSuccess();
		}
	}

	showSuccess() {
    	this.toastrService.success('', 'register successfully', {
    		timeOut: 1000,
		    positionClass: 'toast-top-right'
    	});
  	}

  	showFail() {
    	this.toastrService.error('', 'register fail', {
    		timeOut: 700,
		    positionClass: 'toast-top-right'
    	});
  	}
}
