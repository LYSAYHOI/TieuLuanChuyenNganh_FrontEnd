import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './../../services/account.service';
import { Subscription } from 'rxjs';

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
		private accountService: AccountService
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
			console.log(response);
		}, (error)=>{
			console.log(error);
		})
	}
}
