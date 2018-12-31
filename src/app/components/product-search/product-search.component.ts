import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductService } from './../../services/get-product.service'
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-product-search',
	templateUrl: './product-search.component.html',
	styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

	private selectedIndex: number = 1;
	private firstRun: boolean = true;
	private productList: any[] = [];
	private productListCount: number[] = [];
	private paramSubscription : Subscription;
	private getProductSubcription : Subscription;
	private keyword: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: GetProductService,
		private cookieService: CookieService,
		private router: Router,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getParams(1);
	}

	ngOnDestroy() {
		if(this.paramSubscription)
			this.paramSubscription.unsubscribe();
		if(this.getProductSubcription)
			this.getProductSubcription.unsubscribe();
	}

	getParams(index) {
		this.paramSubscription = this.activatedRoute.params.subscribe(
			data => {
				this.keyword = data.keyword;
				this.getProductBySearch(this.keyword, index);
				this.selectedIndex = index;
			}
		);
	}

	getProductBySearch(keyword, index){
		this.getProductSubcription = this.productService.GetProductBySearch(keyword, index).subscribe(
			data => {
				this.productList = data['object'];
				this.pagination();
				
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
			this.showSuccess();
		} else {
			let arr : any[] = [];
			let productListIndex = this.findProductById(id);
			let item = {
				quantity: 1,
				productDTO: this.productList[productListIndex]
			}
			arr.push(item);
			this.cookieService.set('cart', JSON.stringify(arr))
			this.showSuccess();
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

	pagination() {

		this.productService.getProductBySearchCount(this.keyword).subscribe(
			response =>{
				this.productListCount = [];
				let num = response['object'];
				for(let i = 0 ; i <= parseInt((num/8).toString()); i++)
					this.productListCount.push(i);
			}, error => {
				console.log(error);
			}
		);
	}

	showSuccess() {
    	this.toastrService.success('', 'add to cart successfully', {
    		timeOut: 1000,
		    positionClass: 'toast-top-right'
    	});
  	}

  	showFail() {
    	this.toastrService.error('', 'add to cart  fail', {
    		timeOut: 700,
		    positionClass: 'toast-top-right'
    	});
  	}
}
