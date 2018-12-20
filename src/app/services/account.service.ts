import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	private registerAPI : string = "http://localhost:8080/Register";
	private loginAPI : string = "http://localhost:8080/Login";
	constructor(
		private http: HttpClient
	) { }

	register(data) {
		return this.http.post(this.registerAPI, data);
	}

	login(data) {
		return this.http.post(this.loginAPI, data);
	}
}
