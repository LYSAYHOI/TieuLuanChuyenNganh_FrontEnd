import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	private isOpen = true;
	private isLogined: boolean = false;
	private loginName: string;

	@Output("toggleSideBar") onHandleToggleSideBar = new EventEmitter<boolean>();

	constructor(private cookieService: CookieService) { }

	ngOnInit() {
		this.checkLogin();
	}

	checkLogin() {
		if(this.cookieService.check('token')){
			let token = JSON.parse(this.cookieService.get('token'));
			this.isLogined = true;
			this.loginName = token['userName'];
		}
		else this.isLogined = false;
	}

	private _toggleSidebar() : void {
		this.onHandleToggleSideBar.emit(this.isOpen);
	}
}
