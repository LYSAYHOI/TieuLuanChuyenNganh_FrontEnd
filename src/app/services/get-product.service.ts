import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GetProductService {

	private APIGetCategory: string = 'http://localhost:8080/GetCategoryList';
	private APIGetTrendProduct : string = 'http://localhost:8080/Product/GetTheMostViewedProduct';
	private APIGetProductByCategory : string = 'http://localhost:8080/Product/GetProductByCategory';
	private APTGetProductDetail : string = 'http://localhost:8080/Product/GetProduct';
	constructor(
		private http: HttpClient
	) {}

	getCategoryList() {
		return this.http.get(this.APIGetCategory);
	}

	getTrendPoduct(){
		let myParams = new HttpParams().set('index', "1").set("maxResult","3");
		return this.http.get(this.APIGetTrendProduct, {params: myParams});
	}

	getProductByCategory(category : string) {
		let myparams = new HttpParams().set('categoryId', category).set('index', '1').set('maxResult', '9');
		return this.http.get(this.APIGetProductByCategory, {params: myparams})
	}

	getProductByCategoryProductPage(category : string) {
		let myparams = new HttpParams().set('categoryId', category).set('index', '1').set('maxResult', '10');
		return this.http.get(this.APIGetProductByCategory, {params: myparams})
	}

	getProductDetail(idProduct : string) {
		let myparams = new HttpParams().set('idProduct', idProduct);
		return this.http.get(this.APTGetProductDetail, {params: myparams})
	}
	
}
