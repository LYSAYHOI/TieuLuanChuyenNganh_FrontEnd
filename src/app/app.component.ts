import { Component, OnInit } from '@angular/core';
import { GetCategoryService } from './services/get-category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	private _opened: boolean;
	private category: any;

	constructor(
		private getCategoryService: GetCategoryService
	) { }

	ngOnInit() {
		this._opened = false;
		this.getCategory();
	}

	title = 'e-commerce';
	
	private toggleSideBar(value) {
		console.log(value);
		this._opened = value;
	}
	private openingSideBar() {
		var body = document.getElementsByTagName("body")[0];
		body.style.overflow = "hidden";
	}
	private closingSideBar() {
		var body = document.getElementsByTagName("body")[0];
		body.style.overflow = "visible";
		this._opened = false;
	}
	private getCategory(){
		this.getCategoryService.getCategoryList().subscribe(
			data => {
				this.category = data["object"];
			}, error => {
				console.log(error);
			}
		)
	}
}
