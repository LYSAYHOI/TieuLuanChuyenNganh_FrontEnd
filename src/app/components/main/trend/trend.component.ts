import { Component, OnInit } from '@angular/core';
import { GetProductService } from './../../../services/get-product.service';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {

	private trendProduct: any;
	constructor(private getProductService: GetProductService) { }

	ngOnInit() {
		this.getProductService.getTrendPoduct().subscribe(
			data => this.trendProduct = data['object'],
			error => console.log(error)
		)
	}

}
