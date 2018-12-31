import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './../../services/account.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

	private login_name: string;
	private identity_number: number;
	private email: string;
	private user_name: string;
	private pass: string;
	private role: number;
	private phone_number: number;

	private subscription: Subscription;

	constructor(
		private accountService: AccountService,
		private toastrService: ToastrService,
		private router: Router
	) { }

	ngOnInit() {
		console.log(this.login_name);
	}

	ngOnDestroy() {
		if(this.subscription)
			this.subscription.unsubscribe();
	}

	register() {
		let data = {
			userName: this.user_name,
			identityNumber: this.identity_number,
			phoneNumber: this.phone_number,
			password : this.pass,
			loginName: this.login_name,
			email: this.email,
			role: this.role
			
		};
		this.subscription = this.accountService.register(data).subscribe((response)=>{
			this.showSuccess();
			this.router.navigate(['/login']);
		}, (error)=>{
			console.log(error);
		})
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
