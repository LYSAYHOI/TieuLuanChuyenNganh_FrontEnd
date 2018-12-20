import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './../../services/account.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	private user_name: string;
	private pass: string;
	private disableLogin: boolean = false;

	private subscription: Subscription;
	constructor(
		private accountService: AccountService,
		private cookieService: CookieService,
		private toastrService: ToastrService,
		private router: Router
	){}

	ngOnInit() {

	}

	ngOnDestroy() {
		if(this.subscription)
			this.subscription.unsubscribe();
	}

	login() {
		let user = {
			password : this.pass,
			loginName: this.user_name
		}
		this.subscription = this.accountService.login(user).subscribe((response)=>{
			if(response['status'] == 1){
				this.showFail();
				this.user_name = "";
				this.pass = "";
				return;
			}
			let data = {
				token: response['object'][1],
				userId: response['object'][0]['userId'],
				userName: response['object'][0]['userName'],
				phoneNumber: response['object'][0]['phoneNumber']
			}
			this.cookieService.set('token', JSON.stringify(data));
			this.disableLogin = true;
			this.showSuccess();
			setTimeout(() => {
				window.location.href = "/"
			}, 1300)
			console.log(JSON.stringify(data));
		}, (error)=>{
			this.showFail();
			console.log(error);
		})
		
	}

	showSuccess() {
    	this.toastrService.success('', 'Login successfully', {
    		timeOut: 1000,
		    positionClass: 'toast-top-right'
    	});
  	}

  	showFail() {
    	this.toastrService.error('', 'Login fail', {
    		timeOut: 700,
		    positionClass: 'toast-top-right'
    	});
  	}
}
