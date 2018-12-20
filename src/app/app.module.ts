//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TrendComponent } from './components/main/trend/trend.component';
import { CategoriesDetailComponent } from './components/main/categories-detail/categories-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

//services
import { GetProductService } from './services/get-product.service';
import { GetCategoryService } from './services/get-category.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './services/account.service';
import { OrderService } from './services/order.service';

const routes : Routes = [
	{
		path: '',
		component: MainComponent
	},
	{
		path: 'product/:catalog/:id',
		component: ProductComponent
	},
	{
		path: 'product-detail/:productname/:idProduct',
		component: ProductDetailComponent
	},
	{
		path: 'cart',
		component: CartComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'login',
		component: LoginComponent
	}
]

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MainComponent,
		TrendComponent,
		CategoriesDetailComponent,
		ProductComponent,
		ProductDetailComponent,
		CartComponent,
		RegisterComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		SidebarModule.forRoot(),
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		NoopAnimationsModule,
		ToastrModule.forRoot()
	],
	providers: [
		GetProductService,
		GetCategoryService,
		CookieService,
		AccountService,
		OrderService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
