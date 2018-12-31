import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-process-order',
	templateUrl: './process-order.component.html',
	styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit {

	private orderDetailList: any[];
	private title: string = 'Waiting Order List';
	constructor(
		private orderService: OrderService,
		private cookieService: CookieService,
		private toastrService: ToastrService

	) { }

	ngOnInit() {
		this.getStatusNoneOrderDetail();
	}

	getStatusNoneOrderDetail() {
		if(!this.cookieService.check('token'))
			return;
		let token = JSON.parse(this.cookieService.get('token'));
		console.log(token);
		this.orderService.getStatusNoneOrderDetail(token['userId']).subscribe(
			response => {
				this.orderDetailList = response['object'];
				console.log(this.orderDetailList);
			}, error => {
				console.log(error);
			}
		)
	}

	getInprocessStatusOrderDetail() {
		if(!this.cookieService.check('token'))
			return;
		let token = JSON.parse(this.cookieService.get('token'));
		console.log(token);
		this.orderService.getInprocessStatusOrderDetail(token['userId']).subscribe(
			response => {
				this.orderDetailList = response['object'];
				console.log(this.orderDetailList);
			}, error => {
				console.log(error);
			}
		)
	}

	getFailStatusOrderDetail() {
		if(!this.cookieService.check('token'))
			return;
		let token = JSON.parse(this.cookieService.get('token'));
		console.log(token);
		this.orderService.getFailStatusOrderDetail(token['userId']).subscribe(
			response => {
				this.orderDetailList = response['object'];
				console.log(this.orderDetailList);
			}, error => {
				console.log(error);
			}
		)
	}

	cancelOrderDetail(index) {
		if(!this.cookieService.check('token'))
			return;
		let idOrder = this.orderDetailList[index]['order']['idOrder'];
		let idProduct = this.orderDetailList[index]['product']['idProduct'];
		let idUser = JSON.parse(this.cookieService.get('token'))['userId'];
		this.orderService.failOrderDetail(idOrder, idProduct, idUser).subscribe(
			response =>{
				this.showSuccess();
				this.orderDetailList.splice(index, 1);
			}, error => {
				console.log(error);
			}
		)
	}

	acceptOrderDetail(index) {
		if(!this.cookieService.check('token'))
			return;
		let idOrder = this.orderDetailList[index]['order']['idOrder'];
		let idProduct = this.orderDetailList[index]['product']['idProduct'];
		let idUser = JSON.parse(this.cookieService.get('token'))['userId'];
		this.orderService.inprocessOrderDetail(idOrder, idProduct, idUser).subscribe(
			response =>{
				this.showSuccess();
				this.orderDetailList.splice(index, 1);
			}, error => {
				console.log(error);
			}
		)
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

  	none() {
  		this.title = "Waiting Order List";
  		this.getStatusNoneOrderDetail();
  	}

  	fail() {
  		this.title = "Failed Order List";
  		this.getFailStatusOrderDetail();
  	}

  	inprocess() {
  		this.title = "Inprocessing Order List";
  		this.getInprocessStatusOrderDetail();
  	}
}
