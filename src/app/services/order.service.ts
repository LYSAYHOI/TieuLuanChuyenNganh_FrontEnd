import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	private createOrderAPI: string = "http://localhost:8080/Order/CreateOrder";

	constructor(
		private http: HttpClient
	) { }

	createOrder(data, token) {
		let header = { token: token}
		return this.http.post(this.createOrderAPI, data, {headers: header});
	}
}
