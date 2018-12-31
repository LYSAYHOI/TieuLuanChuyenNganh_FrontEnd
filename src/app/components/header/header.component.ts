import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	private numberOfProductsInCart: number;
	private isOpen = true;
	private role: string = 'NONE';
	private loginName: string;
	private keyword: string;
	@Output("toggleSideBar") onHandleToggleSideBar = new EventEmitter<boolean>();

	constructor(private cookieService: CookieService, private router: Router) { }

	ngOnInit() {
		this.checkLogin();	
		this.getNumberOfProductsInCart();
	}

	checkLogin() {
		if(this.cookieService.check('token')){
			let token = JSON.parse(this.cookieService.get('token'));
			this.role = token['role'];
			this.loginName = token['userName'];
		}
		else this.role = 'NONE';
	}

	private _toggleSidebar() : void {
		this.onHandleToggleSideBar.emit(this.isOpen);
	}

	logout() {
		if(this.cookieService.check('token')){
			this.cookieService.deleteAll();
			this.role = 'NONE';
			window.location.href = '/';
		}
	}

	search() {
		this.router.navigate(['/search', this.keyword]);
	}

	getNumberOfProductsInCart() {
		if(!this.cookieService.check('cart')){
			this.numberOfProductsInCart = 0;
		}else{
			let cart = JSON.parse(this.cookieService.get('cart'));
			this.numberOfProductsInCart = cart.length;
		}
	}
}
