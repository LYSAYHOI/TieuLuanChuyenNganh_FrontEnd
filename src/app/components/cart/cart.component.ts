import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from './../../services/order.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	private cart: any[];
	private totalPrice: number;
	private address: string;
	private orderSubscription: Subscription;
	constructor(
		private cookieService: CookieService,
		private orderService: OrderService,
		private router: Router,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getCart();
	}

	getCart () {
		if(!this.cookieService.check('token')){
			this.router.navigate(['/login'])
			return;
		}
		if(!this.cookieService.check('cart'))
			return;
		let cookie = this.cookieService.get('cart');
		this.cart = JSON.parse(cookie);
		this.calTotalPrice();

	}

	calTotalPrice() {
		this.totalPrice = 0;
		for(let i in this.cart){
			this.totalPrice = this.totalPrice + (this.cart[i]['quantity']*this.cart[i]['productDTO']['price']);
		}
	}

	createOrder() {
		if(!this.cookieService.check('token'))
			return;
		let token = JSON.parse(this.cookieService.get('token'));
		let data = {
			orderDTO: {
				price: this.totalPrice,
				content: "",
				fullName: token['userName'],
				address: this.address,
				phoneNumber: token['phoneNumber'],
				consumerDTO: {
					userId: token['userId']
				}
			},
			cart: this.cart
		}
		this.orderSubscription = this.orderService.createOrder(data, token['token']).subscribe((response)=>{
			this.showSuccess();
			this.router.navigate(['/order'])
		}, (error) => {
			console.log(error);
		})
	}

	quantityChange(event, index) {
		if(event < 1 || event > 30)
			return;
		console.log(event);
		this.cart[index]['quantity'] = event;
		this.cookieService.set('cart', JSON.stringify(this.cart));
		this.calTotalPrice();
	}

	minus(index) {
		this.quantityChange(this.cart[index]['quantity'] - 1, index);
	}

	plus(index) {
		this.quantityChange(this.cart[index]['quantity'] + 1, index);
	}

	delete(index) {
		this.cart.splice(index, 1);
		this.cookieService.set('cart', JSON.stringify(this.cart));
		this.calTotalPrice();
	}

	showSuccess() {
    	this.toastrService.success('', 'successfully', {
    		timeOut: 1000,
		    positionClass: 'toast-top-right'
    	});
  	}
  	showFail() {
    	this.toastrService.error('', 'fail', {
    		timeOut: 700,
		    positionClass: 'toast-top-right'
    	});
  	}
}
