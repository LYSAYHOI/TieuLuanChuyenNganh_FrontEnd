import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GetCategoryService {

	private API: string = 'http://localhost:8080/GetCategoryList';
	constructor(
		private http: HttpClient
	) { }

	getCategoryList() {
		return this.http.get(this.API);
	}
}
