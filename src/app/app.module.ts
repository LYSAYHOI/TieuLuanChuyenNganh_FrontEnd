//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule} from 'ngx-smart-modal';
import { ProcessOrderComponent } from './components/process-order/process-order.component';

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
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { FooterComponent } from './components/footer/footer.component';

//services
import { GetProductService } from './services/get-product.service';
import { GetCategoryService } from './services/get-category.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './services/account.service';
import { OrderService } from './services/order.service';
import { ProductSearchComponent } from './components/product-search/product-search.component';

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
	},
	{
		path: 'order',
		component: OrderStatusComponent
	},
	{
		path: 'process-order',
		component: ProcessOrderComponent
	},
	{
		path: 'search/:keyword',
		component: ProductSearchComponent
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
		FooterComponent,
		OrderStatusComponent,
		ProcessOrderComponent,
		ProductSearchComponent,
	],
	imports: [
		BrowserModule,
		SidebarModule.forRoot(),
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		NoopAnimationsModule,
		ToastrModule.forRoot(),
		NgxSmartModalModule.forRoot()
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
