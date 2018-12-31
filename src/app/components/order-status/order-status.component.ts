import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './../../services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-order-status',
	templateUrl: './order-status.component.html',
	styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit, OnDestroy {

	private orderList: any[] = [];
	private orderDetail: any[] = [];
	constructor(
		private orderSerice: OrderService,
		private cookieService: CookieService,
		private ngxSmartModalService: NgxSmartModalService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getOrder();
	}

	ngOnDestroy() {

	}

	getOrder() {
		if(!this.cookieService.check('token'))
			return;
		let cookie = JSON.parse(this.cookieService.get('token'));
		this.orderSerice.getOrder(cookie['userId']).subscribe(
			(response) => {
				this.orderList = response['object'];
			}, (error) => {
				console.log(error);
			}
		)
	}

	getOrderDetail(id){
		this.orderSerice.getOrderDetail(id).subscribe(
			(response)=>{
				this.orderDetail = response['object'];
				this.openOrderDetail();
			}, (error)=> {
				console.log(error);
			}
		)
	}

	openOrderDetail() {
		this.ngxSmartModalService.resetModalData('myModal');
		this.ngxSmartModalService.setModalData(this.orderDetail, 'myModal');
		this.ngxSmartModalService.getModal('myModal').open();
	}
	
	cancelOrder(index) {
		if(!this.cookieService.check('token'))
			return;
		let idOrder = this.orderList[index]['idOrder'];
		let idUser = JSON.parse(this.cookieService.get('token'))['userId'];
		this.orderSerice.cancelOrder(idOrder, idUser).subscribe(
			(response)=>{
				this.showSuccess();
				setTimeout(() => {
					window.location.href = "/order"
				}, 1300)
			}, (error)=>{
				this.showFail();
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
}
