import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductService } from './../../services/get-product.service'
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

	private productList: any[] = [];
	private paramSubscription : Subscription;
	private getProductSubcription : Subscription;

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: GetProductService,
		private cookieService: CookieService,
		private router: Router
	) { }

	ngOnInit() {
		this.getParams();
	}

	ngOnDestroy() {
		if(this.paramSubscription)
			this.paramSubscription.unsubscribe();
		if(this.getProductSubcription)
			this.getProductSubcription.unsubscribe();
	}

	getParams() {
		this.paramSubscription = this.activatedRoute.params.subscribe(
			data => {
				let id = data.id;
				this.getProductByCatalog(id);
			}
		);
	}

	getProductByCatalog(id){
		this.getProductSubcription = this.productService.getProductByCategoryProductPage(id).subscribe(
			data => {
				this.productList = data['object'];
				console.log(this.productList);
			}, error => {
				console.log(error);
			}
		);
	}

	addToCart(id) {
		if(!this.cookieService.check('token')){
			this.router.navigate(['/login']);
			return;
		}
		if(this.cookieService.check('cart')){
			let productListIndex = this.findProductById(id);
			let cookie: any[] = JSON.parse(this.cookieService.get('cart'));
			for(var i in cookie){
				if(cookie[i]['productDTO']['idProduct'] == id){
					cookie[i]['quantity'] = cookie[i]['quantity'] + 1;
					this.cookieService.set('cart', JSON.stringify(cookie));
					return;
				}
			}
			let item = {
				quantity: 1,
				productDTO: this.productList[productListIndex]
			}
			cookie.push(item);
			this.cookieService.set('cart', JSON.stringify(cookie));
		} else {
			let arr : any[] = [];
			let productListIndex = this.findProductById(id);
			let item = {
				quantity: 1,
				productDTO: this.productList[productListIndex]
			}
			arr.push(item);
			this.cookieService.set('cart', JSON.stringify(arr))
		}
	}

	findProductById(id) {
		for(var i in this.productList){
			if((this.productList[i])['idProduct'] == id)
				return i;
		}
		return -1;
	}
	checkcookie(){
		if(this.cookieService.check('cart'))
			console.log(true);
		console.log(false);
	}
}
