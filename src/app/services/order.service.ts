import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	private createOrderAPI: string = "http://localhost:8080/Order/CreateOrder";
	private getOrderAPI: string = "http://localhost:8080/Order/GetOrder";
	private getOrderDetailAPI: string = "http://localhost:8080/Order/GetOrderDetail";
	private cancelOrderAPI: string = "http://localhost:8080/Order/CancelOrder";
	private getStatusNoneOrderDetailAPI: string = "http://localhost:8080/ChangeOrderStatus/GetWaitingOrderDetail";
	private failStatusOrderDetailAPI: string = "http://localhost:8080/ChangeOrderStatus/FailOrderDetail";
	private inprocessStatusOrderDetailAPI: string = "http://localhost:8080/ChangeOrderStatus/InprocessOrderDetail";
	private getInprocessStatusOrderDetailAPI: string = "http://localhost:8080/ChangeOrderStatus/GetInprocessOrderDetail";
	private getFailStatusOrderDetailAPI: string = "http://localhost:8080/ChangeOrderStatus/GetFailOrderDetail";

	constructor(
		private http: HttpClient
	) { }

	createOrder(data, token) {
		let header = { token: token}
		return this.http.post(this.createOrderAPI, data, {headers: header});
	}

	getOrder(idUser) {
		let data = new HttpParams().set('userId', idUser);
		return this.http.get(this.getOrderAPI, {params: data});
	}

	getOrderDetail(idOrder) {
		let data = new HttpParams().set('orderId', idOrder);
		return this.http.get(this.getOrderDetailAPI, {params: data});
	}

	cancelOrder(idOrder, idUser) {
		let data = {
			idOrder: idOrder,
			consumerDTO: {
				userId: idUser
			}
		}
		return this.http.post(this.cancelOrderAPI, data);
	}

	getStatusNoneOrderDetail(producerId) {
		let data = new HttpParams().set('producerId', producerId);
		return this.http.get(this.getStatusNoneOrderDetailAPI, {params: data});
	}

	getInprocessStatusOrderDetail(producerId) {
		let data = new HttpParams().set('producerId', producerId);
		return this.http.get(this.getInprocessStatusOrderDetailAPI, {params: data});
	}

	getFailStatusOrderDetail(producerId) {
		let data = new HttpParams().set('producerId', producerId);
		return this.http.get(this.getFailStatusOrderDetailAPI, {params: data});
	}

	failOrderDetail(idOrder, idProduct, idUser) {
		let data = {
			order: {
				idOrder: idOrder,
			},
			product: {
				idProduct: idProduct,
				userDTO: {
					userId: idUser
				}
			}
		}
		return this.http.post(this.failStatusOrderDetailAPI, data);
	}

	inprocessOrderDetail(idOrder, idProduct, idUser) {
		let data = {
			order: {
				idOrder: idOrder,
			},
			product: {
				idProduct: idProduct,
				userDTO: {
					userId: idUser
				}
			}
		}
		return this.http.post(this.inprocessStatusOrderDetailAPI, data);
	}
}
