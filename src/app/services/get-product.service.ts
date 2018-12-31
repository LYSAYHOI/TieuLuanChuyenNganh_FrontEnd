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
	private APIGetProductDetail : string = 'http://localhost:8080/Product/GetProduct';
	private APIGetProductBySearch: string = 'http://localhost:8080/GetProductBySearch';
	private APIGetProductByCategoryCount: string = 'http://localhost:8080/Product/GetProductByCategoryCount';
	private APIGetProductBySearchCount: string = 'http://localhost:8080/Product/GetProductBySearchCount';

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

	getProductByCategoryProductPage(category : string, index : number) {
		let myparams = new HttpParams().set('categoryId', category).set('index', index.toString()).set('maxResult', '8');
		return this.http.get(this.APIGetProductByCategory, {params: myparams})
	}

	getProductDetail(idProduct : string) {
		let myparams = new HttpParams().set('idProduct', idProduct);
		return this.http.get(this.APIGetProductDetail, {params: myparams})
	}

	GetProductBySearch(keyWord, index) {
		let myparams = new HttpParams().set('keyWord', keyWord).set('index', index).set('maxResult', '8');
		return this.http.get(this.APIGetProductBySearch, {params: myparams})
	}
	
	getProductByCategoryCount(category : string) {
		let myparams = new HttpParams().set('categoryId', category);
		return this.http.get(this.APIGetProductByCategoryCount, {params: myparams})
	}
	getProductBySearchCount(keyWord : string) {
		let myparams = new HttpParams().set('keyWord', keyWord);
		return this.http.get(this.APIGetProductBySearchCount, {params: myparams})
	}
}
